import {createContext,useContext} from 'react';
const pairs=`Home|मुखपृष्ठ
Animals|पशु
Records|रिकॉर्ड
Reports|रिपोर्ट
Settings|सेटिंग
My farm|मेरा फार्म
Herd overview|पशुओं का सार
Total animals|कुल पशु
Healthy|स्वस्थ
Sick|बीमार
Recovering|सुधार जारी
Pregnant|गर्भवती
Vaccinated|टीका लगा
Milking|दूध देने वाले
Add animal|पशु जोड़ें
Add record|रिकॉर्ड जोड़ें
Upcoming care|आने वाली देखभाल
View all|सभी देखें
Next 7 days|अगले 7 दिन
Today|आज
Tomorrow|कल
Overdue|तारीख बीत गई
Recent activity|हाल की गतिविधि
Milk production|दूध उत्पादन
Last 7 days|पिछले 7 दिन
Last 30 days|पिछले 30 दिन
My animals|मेरे पशु
Search name, ID or tag|नाम, आईडी या टैग खोजें
Filters|फ़िल्टर
Reset filters|फ़िल्टर हटाएँ
All|सभी
Animal type|पशु का प्रकार
Health status|स्वास्थ्य स्थिति
Owner name|मालिक का नाम
Village|गाँव
Vaccination status|टीकाकरण स्थिति
Due / no record|बाकी / रिकॉर्ड नहीं
Cow|गाय
Buffalo|भैंस
Goat|बकरी
Sheep|भेड़
Dog|कुत्ता
Poultry|मुर्गी
Other|अन्य
Health|स्वास्थ्य
Vaccination|टीकाकरण
Breeding|प्रजनन
Milk|दूध
Feed|चारा
Money|आय-खर्च
Growth|वज़न
Animal name|पशु का नाम
Animal ID|पशु आईडी
Tag number|टैग नंबर
Breed|नस्ल
Sex|लिंग
Female|मादा
Male|नर
Unknown|पता नहीं
Date of birth|जन्म तिथि
Age in years|आयु (वर्ष)
Weight (kg)|वज़न (किलो)
Colour|रंग
Producing milk|दूध देता है
Yes|हाँ
No|नहीं
Animal photo|पशु की फ़ोटो
Mobile number|मोबाइल नंबर
Address|पता
Purchase date|खरीद की तारीख
Purchase cost (₹)|खरीद की कीमत (₹)
Notes|टिप्पणी
Record date|रिकॉर्ड की तारीख
Veterinarian|पशु चिकित्सक
Cost (₹)|खर्च (₹)
Diagnosis / condition|निदान / समस्या
Symptoms|लक्षण
Disease history|बीमारी का इतिहास
Treatment|इलाज
Medicine|दवा
Prescribed dosage|डॉक्टर की लिखी खुराक
Follow-up date|अगली जाँच
Recovery status|सुधार की स्थिति
Vaccine name|टीके का नाम
Date given|टीका लगाने की तारीख
Next due date|अगली तारीख
Remarks|टिप्पणी
Pregnancy status|गर्भ की स्थिति
Not pregnant|गर्भवती नहीं
Delivered|बच्चा हुआ
Insemination / mating date|गर्भाधान की तारीख
Expected delivery|प्रसव की अनुमानित तारीख
Last birth date|पिछले प्रसव की तारीख
Breeding and birth history|प्रजनन और प्रसव का इतिहास
Offspring details|बच्चों का विवरण
Milk yield (L)|दूध की मात्रा (लीटर)
Milking session|दुहने का समय
Daily total|दिन का कुल
Morning|सुबह
Evening|शाम
Feed observations|चारे का असर
Feed type|चारे का प्रकार
Feeding schedule|चारा देने का समय
Daily quantity (kg)|रोज़ की मात्रा (किलो)
Nutrition notes|पोषण संबंधी टिप्पणी
Category|श्रेणी
Amount (₹)|राशि (₹)
Other expense|अन्य खर्च
Milk sale|दूध की बिक्री
Animal sale|पशु की बिक्री
Choose|चुनें
Save animal|पशु सहेजें
Save record|रिकॉर्ड सहेजें
Save changes|बदलाव सहेजें
Continue|आगे बढ़ें
Back|वापस
Animal details|पशु की जानकारी
Owner details|मालिक की जानकारी
Purchase details|खरीद की जानकारी
Edit animal|पशु संपादित करें
Register|पंजीकरण
Record book|रिकॉर्ड बही
All records|सभी रिकॉर्ड
Animal|पशु
No records yet|अभी कोई रिकॉर्ड नहीं
No animals found|कोई पशु नहीं मिला
No care due|कोई देखभाल बाकी नहीं
Show more|और देखें
Checkup|जाँच
Animal profile|पशु प्रोफ़ाइल
History|इतिहास
Weight trend|वज़न का रुझान
Farm reports|फार्म की रिपोर्ट
Species distribution|प्रजातियों का अनुपात
Vaccination coverage|टीकाकरण की स्थिति
Expense breakdown|खर्च का विवरण
Disease frequency|बीमारी की आवृत्ति
Village summary|गाँव के अनुसार
Owner summary|मालिक के अनुसार
Income|आय
Expenses|खर्च
Balance|लाभ / हानि
No data yet|अभी आँकड़े नहीं हैं
Profile|प्रोफ़ाइल
Your name|आपका नाम
Role|भूमिका
Livestock owner|पशुपालक
Veterinary worker|पशु स्वास्थ्य कार्यकर्ता
Dairy farmer|डेयरी किसान
Language|भाषा
Care reminders|देखभाल की याद दिलाएँ
Download backup|बैकअप डाउनलोड करें
Sign out|साइन आउट
Sign in|साइन इन
Create account|खाता बनाएँ
Open demo farm|डेमो फार्म खोलें
Local account|इस डिवाइस का खाता
PIN (4–8 digits)|पिन (4–8 अंक)
Demo farm|डेमो फार्म
On this device|इस डिवाइस पर
Saved|सहेजा गया
Select animal|पशु चुनें
Choose a record|रिकॉर्ड चुनें
Weekly|साप्ताहिक
Monthly|मासिक
Care calendar|देखभाल कैलेंडर
On|चालू
Off|बंद
Edit profile|प्रोफ़ाइल बदलें
All time|सभी तारीखें
Feed and milk|चारा और दूध
Tap a record for details|विवरण के लिए रिकॉर्ड खोलें
Add your first animal|पहला पशु जोड़ें
Choose a small JPG, PNG or WebP photo.|छोटी JPG, PNG या WebP फ़ोटो चुनें।
This ID or tag is already in use.|यह आईडी या टैग पहले से मौजूद है।
Enter a 10-digit mobile number.|10 अंकों का मोबाइल नंबर लिखें।
Check the dates and try again.|तारीखें जाँचकर फिर कोशिश करें।
Could not save. Check available storage.|सहेजा नहीं गया। डिवाइस की जगह जाँचें।
This session already has a milk entry.|इस समय के लिए दूध की मात्रा पहले से दर्ज है।
Delivery|प्रसव
Required fields have an asterisk.|ज़रूरी जानकारी पर तारा लगा है।
Records stay in this browser.|रिकॉर्ड इसी ब्राउज़र में रहते हैं।
No local profile found for this number.|इस नंबर से कोई स्थानीय खाता नहीं मिला।
Edit record|रिकॉर्ड संपादित करें
This mobile number is already registered.|यह मोबाइल नंबर पहले से पंजीकृत है।
Photos|फ़ोटो
Reminders appear on the dashboard.|याद दिलाने वाली तारीखें मुख्य स्क्रीन पर दिखेंगी।
Enter records for|रिकॉर्ड दर्ज करें
Select a female animal for breeding records.|प्रजनन के लिए मादा पशु चुनें।
Born|जन्म
days|दिन
animals|पशु
Farm activity|फार्म की गतिविधि
litres|लीटर
Feed quantity|चारे की मात्रा
Date|तारीख
No animal selected|कोई पशु चयनित नहीं
Week total|सप्ताह का कुल
Month total|महीने का कुल
Current herd|वर्तमान पशु
This week|इस सप्ताह
Due soon|जल्द देय
Account|खाता
Add|जोड़ें
Open record|रिकॉर्ड खोलें
Optional|वैकल्पिक
Record details|रिकॉर्ड विवरण
Daily yield|दैनिक दूध
Grouped by|श्रेणी
Farm totals|फार्म का कुल
Choose a different animal or date.|दूसरा पशु या तारीख चुनें।
Age|आयु
Location|स्थान
Identification|पहचान
Farm register|पशु बही`;
const dict=Object.fromEntries(pairs.split('\n').map(l=>l.split('|')));
export const Language=createContext(false);
export function useText(){const hi=useContext(Language);return (s:string)=>hi?(dict[s]||s):s}
