package in.pashusaathi.app;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.webkit.*;
import android.widget.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import android.util.Log;

public final class FarmActivity extends Activity {
    private static final String HOME = "https://appassets.androidplatform.net/index.html";
    private static final int PHOTO = 20, EXPORT = 21;
    private WebView app;
    private LinearLayout loading;
    private ValueCallback<Uri[]> photoResult;
    private File pendingBackup;

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        pendingBackup = new File(getCacheDir(), "pending-backup.json");
        FrameLayout frame = new FrameLayout(this);
        app = new WebView(this);
        WebSettings settings = app.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        app.addJavascriptInterface(new Device(), "PashuDevice");
        app.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { return true; }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                if (HOME.equals(request.getUrl().toString())) {
                    try { return new WebResourceResponse("text/html", "UTF-8", getAssets().open("index.html")); }
                    catch (IOException ignored) { }
                }
                return new WebResourceResponse("text/plain", "UTF-8", new ByteArrayInputStream(new byte[0]));
            }
        });
        app.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (photoResult != null) photoResult.onReceiveValue(null);
                photoResult = callback;
                Intent picker = new Intent(Intent.ACTION_OPEN_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE).setType("image/*");
                try { startActivityForResult(picker, PHOTO); }
                catch (android.content.ActivityNotFoundException e) { photoResult.onReceiveValue(null); photoResult = null; }
                return true;
            }
        });
        frame.addView(app);
        loading = new LinearLayout(this);
        loading.setOrientation(LinearLayout.VERTICAL);
        loading.setGravity(Gravity.CENTER);
        loading.setBackgroundColor(Color.rgb(247,246,239));
        ImageView mark = new ImageView(this);
        mark.setImageResource(getResources().getIdentifier("farm_mark","drawable",getPackageName()));
        int size=(int)(64*getResources().getDisplayMetrics().density);
        loading.addView(mark,size,size);
        TextView name = new TextView(this);
        name.setText("Pashu Saathi  ·  पशु साथी");
        name.setTextColor(Color.rgb(21,76,57));
        name.setTextSize(23);
        name.setPadding(0, size/4, 0, size/4);
        loading.addView(name);
        ProgressBar progress=new ProgressBar(this);
        progress.setContentDescription("Opening farm records");
        loading.addView(progress,size/3,size/3);
        frame.addView(loading);
        setContentView(frame);
        app.loadUrl(HOME);
    }

    private final class Device {
        @JavascriptInterface public void ready() { runOnUiThread(() -> { loading.setVisibility(View.GONE); Log.i("PashuSaathi","Farm records ready"); }); }
        @JavascriptInterface public void exportBackup(String json) {
            try (FileOutputStream stream = new FileOutputStream(pendingBackup)) {
                stream.write(json.getBytes(StandardCharsets.UTF_8));
            } catch (IOException e) { message(false); return; }
            runOnUiThread(() -> {
                Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT).addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("application/json").putExtra(Intent.EXTRA_TITLE,"Pashu-Saathi-backup.json");
                try { startActivityForResult(intent,EXPORT); } catch (android.content.ActivityNotFoundException e) { message(false); }
            });
        }
    }
    private void message(boolean success) {
        runOnUiThread(() -> {
            String text=success?"Backup saved · बैकअप सहेजा गया":"Backup could not be saved · बैकअप नहीं सहेजा गया";
            Toast.makeText(this,text,Toast.LENGTH_LONG).show();
        });
    }
    @Override protected void onActivityResult(int code,int result,Intent data) {
        super.onActivityResult(code,result,data);
        Uri uri=result==RESULT_OK && data!=null ? data.getData():null;
        if(uri!=null && !"content".equals(uri.getScheme()))uri=null;
        if(code==PHOTO && photoResult!=null) {
            photoResult.onReceiveValue(uri==null?null:new Uri[]{uri});
            photoResult=null;
        } else if(code==EXPORT) {
            if(uri==null){ pendingBackup.delete(); return; }
            final Uri target=uri;
            new Thread(() -> {
                try (InputStream in=new FileInputStream(pendingBackup);OutputStream out=getContentResolver().openOutputStream(target,"wt")) {
                    if(out==null)throw new IOException();
                    byte[] buf=new byte[16384];int count;
                    while((count=in.read(buf))!=-1)out.write(buf,0,count);
                    out.flush();message(true);
                } catch(IOException | SecurityException e){message(false);}
                finally{pendingBackup.delete();}
            }).start();
        }
    }
    @SuppressWarnings("deprecation") @Override public void onBackPressed() {
        app.evaluateJavascript("window.pashuBack ? window.pashuBack() : false", handled -> {
            if(!"true".equals(handled))super.onBackPressed();
        });
    }
    @Override protected void onDestroy() {
        if(photoResult!=null)photoResult.onReceiveValue(null);
        app.removeJavascriptInterface("PashuDevice");app.destroy();super.onDestroy();
    }
}
