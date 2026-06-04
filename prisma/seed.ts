import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// College lists divided by category
interface CollegeData {
  name: string
  city: string
  state: string
  established: number
  type: string
  fees: number
  rating: number
  placement: number
  highestPackage: number
  averagePackage: number
  description: string
  courseFee?: number
}

const iits: CollegeData[] = [
  { name: "IIT Bombay", city: "Mumbai", state: "Maharashtra", established: 1958, type: "Government", fees: 220000, rating: 4.9, placement: 98, highestPackage: 30000000, averagePackage: 2200000, description: "IIT Bombay is a top-tier institute known for outstanding research, faculty, and placements.", courseFee: 220000 },
  { name: "IIT Delhi", city: "New Delhi", state: "Delhi", established: 1961, type: "Government", fees: 220000, rating: 4.8, placement: 97, highestPackage: 28000000, averagePackage: 2000000, description: "IIT Delhi is renowned for strong academics, industry connections and high placements.", courseFee: 220000 },
  { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", established: 1959, type: "Government", fees: 220000, rating: 4.8, placement: 97, highestPackage: 27000000, averagePackage: 1900000, description: "IIT Madras boasts world-class research centres and excellent placement records.", courseFee: 220000 },
  { name: "IIT Kanpur", city: "Kanpur", state: "Uttar Pradesh", established: 1959, type: "Government", fees: 220000, rating: 4.7, placement: 96, highestPackage: 20000000, averagePackage: 1700000, description: "IIT Kanpur is known for rigorous academics and strong alumni networks.", courseFee: 220000 },
  { name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal", established: 1951, type: "Government", fees: 220000, rating: 4.6, placement: 95, highestPackage: 18000000, averagePackage: 1600000, description: "IIT Kharagpur has a long legacy of engineering excellence and diverse programs.", courseFee: 220000 },
  { name: "IIT Roorkee", city: "Roorkee", state: "Uttarakhand", established: 1847, type: "Government", fees: 220000, rating: 4.5, placement: 94, highestPackage: 15000000, averagePackage: 1400000, description: "IIT Roorkee is one of the oldest technical institutions with strong placements.", courseFee: 220000 },
  { name: "IIT Guwahati", city: "Guwahati", state: "Assam", established: 1994, type: "Government", fees: 220000, rating: 4.4, placement: 93, highestPackage: 12000000, averagePackage: 1200000, description: "IIT Guwahati is strong in research and offers good placement opportunities.", courseFee: 220000 },
  { name: "IIT Hyderabad", city: "Hyderabad", state: "Telangana", established: 2008, type: "Government", fees: 220000, rating: 4.5, placement: 94, highestPackage: 14000000, averagePackage: 1300000, description: "IIT Hyderabad focuses on cutting-edge tech research and startups.", courseFee: 220000 },
  { name: "IIT Bhubaneswar", city: "Bhubaneswar", state: "Odisha", established: 2008, type: "Government", fees: 220000, rating: 4.1, placement: 90, highestPackage: 9000000, averagePackage: 800000, description: "IIT Bhubaneswar is an emerging IIT with improving research and placements.", courseFee: 220000 },
  { name: "IIT Gandhinagar", city: "Gandhinagar", state: "Gujarat", established: 2008, type: "Government", fees: 220000, rating: 4.2, placement: 91, highestPackage: 10000000, averagePackage: 900000, description: "IIT Gandhinagar emphasizes interdisciplinary research and student development.", courseFee: 220000 },
  { name: "IIT Jodhpur", city: "Jodhpur", state: "Rajasthan", established: 2008, type: "Government", fees: 220000, rating: 4.0, placement: 89, highestPackage: 8000000, averagePackage: 700000, description: "IIT Jodhpur is a newer IIT growing rapidly in research and placements.", courseFee: 220000 },
  { name: "IIT Patna", city: "Patna", state: "Bihar", established: 2008, type: "Government", fees: 220000, rating: 4.0, placement: 88, highestPackage: 7500000, averagePackage: 650000, description: "IIT Patna provides strong foundational programs and decent placement support.", courseFee: 220000 },
  { name: "IIT Mandi", city: "Mandi", state: "Himachal Pradesh", established: 2009, type: "Government", fees: 220000, rating: 4.1, placement: 89, highestPackage: 9000000, averagePackage: 700000, description: "IIT Mandi focuses on research with personalized faculty attention.", courseFee: 220000 },
  { name: "IIT Indore", city: "Indore", state: "Madhya Pradesh", established: 2009, type: "Government", fees: 220000, rating: 4.2, placement: 90, highestPackage: 11000000, averagePackage: 900000, description: "IIT Indore has strong industry ties and solid placements.", courseFee: 220000 },
  { name: "IIT (BHU) Varanasi", city: "Varanasi", state: "Uttar Pradesh", established: 1919, type: "Government", fees: 220000, rating: 4.3, placement: 91, highestPackage: 12000000, averagePackage: 1000000, description: "IIT (BHU) Varanasi has historic legacy and consistent placement records.", courseFee: 220000 },
  { name: "IIT Palakkad", city: "Palakkad", state: "Kerala", established: 2015, type: "Government", fees: 220000, rating: 4.0, placement: 88, highestPackage: 7000000, averagePackage: 650000, description: "IIT Palakkad is an emerging institute building its research and placements.", courseFee: 220000 },
  { name: "IIT Tirupati", city: "Tirupati", state: "Andhra Pradesh", established: 2015, type: "Government", fees: 220000, rating: 4.0, placement: 88, highestPackage: 7000000, averagePackage: 650000, description: "IIT Tirupati focuses on new-age research and industry collaborations.", courseFee: 220000 },
  { name: "IIT Dhanbad (ISM)", city: "Dhanbad", state: "Jharkhand", established: 1926, type: "Government", fees: 220000, rating: 4.1, placement: 90, highestPackage: 10000000, averagePackage: 900000, description: "IIT Dhanbad (ISM) is known for strong engineering programs and industry ties.", courseFee: 220000 },
  { name: "IIT Bhilai", city: "Bhilai", state: "Chhattisgarh", established: 2016, type: "Government", fees: 220000, rating: 3.9, placement: 85, highestPackage: 6000000, averagePackage: 550000, description: "IIT Bhilai is a young IIT growing its academics and placement record.", courseFee: 220000 },
  { name: "IIT Goa", city: "Goa", state: "Goa", established: 2016, type: "Government", fees: 220000, rating: 3.9, placement: 84, highestPackage: 6000000, averagePackage: 500000, description: "IIT Goa is focused on research and teaching excellence with improving placements.", courseFee: 220000 },
  { name: "IIT Jammu", city: "Jammu", state: "Jammu & Kashmir", established: 2016, type: "Government", fees: 220000, rating: 3.9, placement: 84, highestPackage: 5500000, averagePackage: 480000, description: "IIT Jammu offers solid technical programs and regional placement opportunities.", courseFee: 220000 },
  { name: "IIT Dharwad", city: "Dharwad", state: "Karnataka", established: 2016, type: "Government", fees: 220000, rating: 4.0, placement: 86, highestPackage: 7000000, averagePackage: 600000, description: "IIT Dharwad is building its research profile and industry connections.", courseFee: 220000 },
  { name: "IIT Ropar", city: "Rupnagar", state: "Punjab", established: 2008, type: "Government", fees: 220000, rating: 4.2, placement: 92, highestPackage: 11000000, averagePackage: 1000000, description: "IIT Ropar is known for quality research and consistent placements.", courseFee: 220000 },
]

const nits: CollegeData[] = [
  { name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu", established: 1964, type: "Government", fees: 140000, rating: 4.5, placement: 92, highestPackage: 9000000, averagePackage: 1200000, description: "NIT Trichy is one of the top NITs with excellent placements and faculty.", courseFee: 140000 },
  { name: "NIT Warangal", city: "Warangal", state: "Telangana", established: 1959, type: "Government", fees: 140000, rating: 4.4, placement: 91, highestPackage: 8500000, averagePackage: 1100000, description: "NIT Warangal has a strong alumni network and consistent placement records.", courseFee: 140000 },
  { name: "NIT Surathkal", city: "Mangaluru", state: "Karnataka", established: 1960, type: "Government", fees: 140000, rating: 4.4, placement: 90, highestPackage: 8000000, averagePackage: 1050000, description: "NIT Surathkal is renowned for its academic rigour and placements.", courseFee: 140000 },
  { name: "NIT Calicut", city: "Kozhikode", state: "Kerala", established: 1961, type: "Government", fees: 140000, rating: 4.1, placement: 86, highestPackage: 6000000, averagePackage: 800000, description: "NIT Calicut is known for solid technical programs and regional recruiters.", courseFee: 140000 },
  { name: "NIT Jaipur", city: "Jaipur", state: "Rajasthan", established: 1963, type: "Government", fees: 140000, rating: 4.0, placement: 85, highestPackage: 5500000, averagePackage: 700000, description: "NIT Jaipur offers good academic exposure and improving placement stats.", courseFee: 140000 },
  { name: "NIT Allahabad", city: "Prayagraj", state: "Uttar Pradesh", established: 1961, type: "Government", fees: 140000, rating: 4.0, placement: 84, highestPackage: 6000000, averagePackage: 700000, description: "NIT Allahabad has long-standing reputation and solid placements.", courseFee: 140000 },
  { name: "NIT Rourkela", city: "Rourkela", state: "Odisha", established: 1961, type: "Government", fees: 140000, rating: 4.2, placement: 88, highestPackage: 7000000, averagePackage: 850000, description: "NIT Rourkela is well-regarded for research and placements.", courseFee: 140000 },
  { name: "NIT Kurukshetra", city: "Kurukshetra", state: "Haryana", established: 1963, type: "Government", fees: 140000, rating: 3.9, placement: 80, highestPackage: 4500000, averagePackage: 500000, description: "NIT Kurukshetra provides good regional opportunities and decent placements.", courseFee: 140000 },
  { name: "NIT Durgapur", city: "Durgapur", state: "West Bengal", established: 1960, type: "Government", fees: 140000, rating: 3.9, placement: 79, highestPackage: 4500000, averagePackage: 480000, description: "NIT Durgapur has a strong regional presence and steady placements.", courseFee: 140000 },
  { name: "NIT Bhopal", city: "Bhopal", state: "Madhya Pradesh", established: 1960, type: "Government", fees: 140000, rating: 3.9, placement: 78, highestPackage: 4200000, averagePackage: 450000, description: "NIT Bhopal is an established institute with consistent placement efforts.", courseFee: 140000 },
  { name: "NIT Silchar", city: "Silchar", state: "Assam", established: 1967, type: "Government", fees: 140000, rating: 3.7, placement: 72, highestPackage: 3000000, averagePackage: 350000, description: "NIT Silchar is steadily growing with improving placement numbers.", courseFee: 140000 },
  { name: "NIT Agartala", city: "Agartala", state: "Tripura", established: 1965, type: "Government", fees: 140000, rating: 3.7, placement: 72, highestPackage: 3000000, averagePackage: 340000, description: "NIT Agartala offers steady academic programs and regional placements.", courseFee: 140000 },
  { name: "NIT Hamirpur", city: "Hamirpur", state: "Himachal Pradesh", established: 1986, type: "Government", fees: 140000, rating: 3.8, placement: 75, highestPackage: 4000000, averagePackage: 450000, description: "NIT Hamirpur is a well-connected institute with respectable placements.", courseFee: 140000 },
  { name: "NIT Jalandhar", city: "Jalandhar", state: "Punjab", established: 1987, type: "Government", fees: 140000, rating: 3.8, placement: 75, highestPackage: 4200000, averagePackage: 460000, description: "NIT Jalandhar has good regional ties and improving placements.", courseFee: 140000 },
  { name: "NIT Raipur", city: "Raipur", state: "Chhattisgarh", established: 1956, type: "Government", fees: 140000, rating: 3.9, placement: 77, highestPackage: 4500000, averagePackage: 500000, description: "NIT Raipur provides competitive academic programs and decent placements.", courseFee: 140000 },
  { name: "NIT Srinagar", city: "Srinagar", state: "Jammu & Kashmir", established: 1960, type: "Government", fees: 140000, rating: 3.6, placement: 70, highestPackage: 3000000, averagePackage: 320000, description: "NIT Srinagar supports strong academics despite geographic challenges.", courseFee: 140000 },
  { name: "NIT Manipur", city: "Imphal", state: "Manipur", established: 2010, type: "Government", fees: 140000, rating: 3.5, placement: 68, highestPackage: 2500000, averagePackage: 280000, description: "NIT Manipur is a newer campus developing its placement ecosystem.", courseFee: 140000 },
  { name: "NIT Meghalaya", city: "Shillong", state: "Meghalaya", established: 2011, type: "Government", fees: 140000, rating: 3.6, placement: 70, highestPackage: 2800000, averagePackage: 300000, description: "NIT Meghalaya is growing with emphasis on regional development and academics.", courseFee: 140000 },
  { name: "NIT Mizoram", city: "Aizawl", state: "Mizoram", established: 2010, type: "Government", fees: 140000, rating: 3.5, placement: 67, highestPackage: 2400000, averagePackage: 250000, description: "NIT Mizoram focuses on building strong foundational programs.", courseFee: 140000 },
  { name: "NIT Nagaland", city: "Chümoukedima", state: "Nagaland", established: 2010, type: "Government", fees: 140000, rating: 3.5, placement: 67, highestPackage: 2400000, averagePackage: 250000, description: "NIT Nagaland emphasizes regional outreach and academics.", courseFee: 140000 },
  { name: "NIT Sikkim", city: "Rangpo", state: "Sikkim", established: 2010, type: "Government", fees: 140000, rating: 3.5, placement: 67, highestPackage: 2400000, averagePackage: 250000, description: "NIT Sikkim is an emerging campus focusing on undergraduate education.", courseFee: 140000 },
  { name: "NIT Arunachal Pradesh", city: "Yupia", state: "Arunachal Pradesh", established: 2010, type: "Government", fees: 140000, rating: 3.5, placement: 66, highestPackage: 2300000, averagePackage: 240000, description: "NIT Arunachal Pradesh is a young campus building its programs.", courseFee: 140000 },
  { name: "NIT Delhi", city: "New Delhi", state: "Delhi", established: 2010, type: "Government", fees: 140000, rating: 3.8, placement: 76, highestPackage: 5000000, averagePackage: 600000, description: "NIT Delhi benefits from proximity to industry and growing placements.", courseFee: 140000 },
  { name: "NIT Goa", city: "Ponda", state: "Goa", established: 2010, type: "Government", fees: 140000, rating: 3.6, placement: 70, highestPackage: 3000000, averagePackage: 320000, description: "NIT Goa focuses on teaching and regional industry connections.", courseFee: 140000 },
  { name: "NIT Puducherry", city: "Puducherry", state: "Puducherry", established: 2010, type: "Government", fees: 140000, rating: 3.6, placement: 71, highestPackage: 3200000, averagePackage: 330000, description: "NIT Puducherry offers growing academic programs and campus opportunities.", courseFee: 140000 },
  { name: "NIT Uttarakhand", city: "Srinagar", state: "Uttarakhand", established: 2010, type: "Government", fees: 140000, rating: 3.6, placement: 71, highestPackage: 3200000, averagePackage: 330000, description: "NIT Uttarakhand provides solid regional academic programs.", courseFee: 140000 },
  { name: "NIT Andhra Pradesh", city: "Tadepalligudem", state: "Andhra Pradesh", established: 2015, type: "Government", fees: 140000, rating: 3.7, placement: 73, highestPackage: 3500000, averagePackage: 360000, description: "NIT Andhra Pradesh is a newer NIT focusing on growth and placements.", courseFee: 140000 },
  { name: "NIT Surat", city: "Surat", state: "Gujarat", established: 2015, type: "Government", fees: 140000, rating: 3.8, placement: 75, highestPackage: 4000000, averagePackage: 420000, description: "NIT Surat offers regional industry ties and growing placement records.", courseFee: 140000 },
  { name: "NIT Patna", city: "Patna", state: "Bihar", established: 2004, type: "Government", fees: 140000, rating: 3.7, placement: 74, highestPackage: 3800000, averagePackage: 400000, description: "NIT Patna provides solid technical education and decent placements.", courseFee: 140000 },
]

const iiits: CollegeData[] = [
  { name: "IIIT Hyderabad", city: "Hyderabad", state: "Telangana", established: 1998, type: "Private", fees: 300000, rating: 4.5, placement: 92, highestPackage: 5000000, averagePackage: 1200000, description: "IIIT Hyderabad is a top CS-focused institute with excellent placements and research.", courseFee: 300000 },
  { name: "IIIT Delhi", city: "New Delhi", state: "Delhi", established: 2008, type: "Government", fees: 300000, rating: 4.4, placement: 90, highestPackage: 4800000, averagePackage: 1100000, description: "IIIT Delhi emphasizes research and industry collaborations in computing fields.", courseFee: 300000 },
  { name: "IIIT Allahabad", city: "Prayagraj", state: "Uttar Pradesh", established: 1999, type: "Government", fees: 260000, rating: 4.0, placement: 88, highestPackage: 3500000, averagePackage: 900000, description: "IIIT Allahabad focuses on information technology and strong campus recruitment.", courseFee: 260000 },
  { name: "IIIT Bangalore", city: "Bengaluru", state: "Karnataka", established: 1999, type: "Deemed", fees: 280000, rating: 4.1, placement: 89, highestPackage: 4200000, averagePackage: 1000000, description: "IIIT Bangalore blends industry-ready curriculum with research exposure.", courseFee: 280000 },
  { name: "IIIT Pune", city: "Pune", state: "Maharashtra", established: 2016, type: "Government", fees: 240000, rating: 3.9, placement: 80, highestPackage: 2200000, averagePackage: 600000, description: "IIIT Pune is an emerging institute strong in applied computing programs.", courseFee: 240000 },
]

const apColleges: CollegeData[] = [
  { name: "Shri Vishnu Engineering College for Women (Bhimavaram)", city: "Bhimavaram", state: "Andhra Pradesh", established: 1997, type: "Private", fees: 85000, rating: 4.3, placement: 89, highestPackage: 1800000, averagePackage: 650000, description: "A premier women's engineering college in West Godavari district, known for excellent placements and academic excellence.", courseFee: 85000 },
  { name: "JNTUK Kakinada", city: "Kakinada", state: "Andhra Pradesh", established: 1946, type: "Government", fees: 45000, rating: 4.0, placement: 85, highestPackage: 1200000, averagePackage: 450000, description: "JNTUK Kakinada is a well-established government engineering college with strong regional reputation.", courseFee: 45000 },
  { name: "Andhra University Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 1926, type: "Government", fees: 45000, rating: 4.1, placement: 86, highestPackage: 1300000, averagePackage: 480000, description: "Andhra University offers diverse engineering programs and good placement ties.", courseFee: 45000 },
  { name: "SVEC Tirupati", city: "Tirupati", state: "Andhra Pradesh", established: 1996, type: "Private", fees: 120000, rating: 3.9, placement: 78, highestPackage: 900000, averagePackage: 420000, description: "SVEC Tirupati is a private college with good academic programs and campus life.", courseFee: 120000 },
  { name: "VVIT Guntur", city: "Guntur", state: "Andhra Pradesh", established: 2007, type: "Private", fees: 120000, rating: 3.8, placement: 75, highestPackage: 700000, averagePackage: 350000, description: "VVIT Guntur provides solid local placement opportunities and practical training.", courseFee: 120000 },
  { name: "Vignan University Guntur", city: "Guntur", state: "Andhra Pradesh", established: 1997, type: "Deemed", fees: 150000, rating: 4.0, placement: 80, highestPackage: 1200000, averagePackage: 450000, description: "Vignan University is known for its academic environment and strong alumni base.", courseFee: 150000 },
  { name: "KL University Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 1980, type: "Deemed", fees: 160000, rating: 4.1, placement: 82, highestPackage: 1500000, averagePackage: 550000, description: "KL University is a reputed deemed university with good placements and industry links.", courseFee: 160000 },
  { name: "Gayatri Vidya Parishad Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 1996, type: "Private", fees: 120000, rating: 3.9, placement: 76, highestPackage: 800000, averagePackage: 380000, description: "Gayatri Vidya Parishad offers good local industry connections and campus activities.", courseFee: 120000 },
  { name: "Anil Neerukonda Institute Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 2001, type: "Private", fees: 120000, rating: 3.8, placement: 74, highestPackage: 700000, averagePackage: 360000, description: "Anil Neerukonda Institute focuses on technology programs and practical training.", courseFee: 120000 },
  { name: "GITAM Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 1980, type: "Deemed", fees: 160000, rating: 4.0, placement: 81, highestPackage: 1300000, averagePackage: 500000, description: "GITAM is a large deemed university with varied programs and decent placements.", courseFee: 160000 },
  { name: "RVR and JC College Guntur", city: "Guntur", state: "Andhra Pradesh", established: 1985, type: "Private", fees: 110000, rating: 3.8, placement: 73, highestPackage: 650000, averagePackage: 320000, description: "RVR and JC College provides good regional placements and practical exposure.", courseFee: 110000 },
  { name: "Bapatla Engineering College", city: "Bapatla", state: "Andhra Pradesh", established: 1981, type: "Private", fees: 110000, rating: 3.7, placement: 70, highestPackage: 600000, averagePackage: 300000, description: "Bapatla Engineering College is a long-standing private college with steady placements.", courseFee: 110000 },
  { name: "Vasireddy Venkatadri Institute Guntur", city: "Guntur", state: "Andhra Pradesh", established: 1981, type: "Private", fees: 110000, rating: 3.8, placement: 72, highestPackage: 650000, averagePackage: 310000, description: "Vasireddy Venkatadri Institute focuses on local industry ties and teaching quality.", courseFee: 110000 },
  { name: "Narasaraopeta Engineering College", city: "Narasaraopet", state: "Andhra Pradesh", established: 1981, type: "Private", fees: 110000, rating: 3.7, placement: 70, highestPackage: 600000, averagePackage: 300000, description: "Narasaraopeta Engineering College has consistent local placement performance.", courseFee: 110000 },
  { name: "Sri Vasavi Engineering College Tadepalligudem", city: "Tadepalligudem", state: "Andhra Pradesh", established: 1998, type: "Private", fees: 110000, rating: 3.7, placement: 71, highestPackage: 620000, averagePackage: 310000, description: "Sri Vasavi Engineering College offers practical training and local recruitment.", courseFee: 110000 },
  { name: "Godavari Institute of Engineering Rajahmundry", city: "Rajahmundry", state: "Andhra Pradesh", established: 1998, type: "Private", fees: 110000, rating: 3.7, placement: 70, highestPackage: 600000, averagePackage: 300000, description: "Godavari Institute focuses on undergraduate engineering education with local placements.", courseFee: 110000 },
  { name: "Kallam Haranadhareddy Institute Guntur", city: "Guntur", state: "Andhra Pradesh", established: 2008, type: "Private", fees: 110000, rating: 3.6, placement: 69, highestPackage: 580000, averagePackage: 290000, description: "Kallam Haranadhareddy Institute offers strong local industry links and practical programs.", courseFee: 110000 },
  { name: "PVPSIT Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 2008, type: "Private", fees: 110000, rating: 3.7, placement: 71, highestPackage: 600000, averagePackage: 310000, description: "PVPSIT Vijayawada is known for campus activities and steady placements.", courseFee: 110000 },
  { name: "Sasi Institute of Technology Tadepalligudem", city: "Tadepalligudem", state: "Andhra Pradesh", established: 2001, type: "Private", fees: 110000, rating: 3.6, placement: 69, highestPackage: 580000, averagePackage: 290000, description: "Sasi Institute of Technology focuses on practical engineering skills and regional recruiters.", courseFee: 110000 },
  { name: "Pragati Engineering College Surampalem", city: "Surampalem", state: "Andhra Pradesh", established: 2001, type: "Private", fees: 110000, rating: 3.6, placement: 68, highestPackage: 550000, averagePackage: 280000, description: "Pragati Engineering College provides vocational training and local placements.", courseFee: 110000 },
  { name: "Dhanekula Institute Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 2001, type: "Private", fees: 110000, rating: 3.7, placement: 70, highestPackage: 600000, averagePackage: 300000, description: "Dhanekula Institute offers a range of technical programs and campus placements.", courseFee: 110000 },
  { name: "Lakireddy Bali Reddy College Mylavaram", city: "Mylavaram", state: "Andhra Pradesh", established: 1981, type: "Private", fees: 100000, rating: 3.6, placement: 68, highestPackage: 550000, averagePackage: 280000, description: "Lakireddy Bali Reddy College is a trusted regional college with steady outcomes.", courseFee: 100000 },
  { name: "QIS College of Engineering Ongole", city: "Ongole", state: "Andhra Pradesh", established: 1998, type: "Private", fees: 100000, rating: 3.6, placement: 67, highestPackage: 520000, averagePackage: 270000, description: "QIS College of Engineering has local industry ties and practical training.", courseFee: 100000 },
  { name: "Avanthi Institute Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 2004, type: "Private", fees: 100000, rating: 3.5, placement: 66, highestPackage: 500000, averagePackage: 260000, description: "Avanthi Institute focuses on undergraduate teaching and local recruiters.", courseFee: 100000 },
  { name: "Sri Sunflower College of Engineering Lankapalli", city: "Lankapalli", state: "Andhra Pradesh", established: 2006, type: "Private", fees: 100000, rating: 3.5, placement: 65, highestPackage: 480000, averagePackage: 250000, description: "Sri Sunflower College provides hands-on training and local placement opportunities.", courseFee: 100000 },
  { name: "Vishnu Institute of Technology Bhimavaram", city: "Bhimavaram", state: "Andhra Pradesh", established: 2001, type: "Private", fees: 100000, rating: 3.7, placement: 72, highestPackage: 650000, averagePackage: 320000, description: "Vishnu Institute of Technology has good campus culture and placement support.", courseFee: 100000 },
  { name: "RISE Krishna Sai Prakasam Group Ongole", city: "Ongole", state: "Andhra Pradesh", established: 2006, type: "Private", fees: 100000, rating: 3.5, placement: 66, highestPackage: 500000, averagePackage: 260000, description: "RISE Krishna Sai Prakasam Group focuses on practical skills and regional recruiters.", courseFee: 100000 },
  { name: "Velagapudi Ramakrishna Siddhartha Engineering Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 1972, type: "Private", fees: 120000, rating: 4.0, placement: 85, highestPackage: 1200000, averagePackage: 500000, description: "Siddhartha Engineering is a respected college with strong industry connections.", courseFee: 120000 },
  { name: "PVP Siddhartha Institute Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 1996, type: "Private", fees: 110000, rating: 3.9, placement: 78, highestPackage: 800000, averagePackage: 360000, description: "PVP Siddhartha Institute offers solid campus life and placement activity.", courseFee: 110000 },
  { name: "Chirala Engineering College", city: "Chirala", state: "Andhra Pradesh", established: 1981, type: "Private", fees: 100000, rating: 3.6, placement: 68, highestPackage: 550000, averagePackage: 280000, description: "Chirala Engineering College is a steady regional college with practical programs.", courseFee: 100000 },
]

const tsColleges: CollegeData[] = [
  { name: "JNTUH Hyderabad", city: "Hyderabad", state: "Telangana", established: 1965, type: "Government", fees: 50000, rating: 4.0, placement: 80, highestPackage: 1500000, averagePackage: 500000, description: "JNTUH is a major state university with broad technical programs and good placements.", courseFee: 50000 },
  { name: "Osmania University", city: "Hyderabad", state: "Telangana", established: 1917, type: "Government", fees: 50000, rating: 4.1, placement: 82, highestPackage: 1600000, averagePackage: 520000, description: "Osmania University has a long history and strong academic offerings.", courseFee: 50000 },
  { name: "CBIT Hyderabad", city: "Hyderabad", state: "Telangana", established: 1979, type: "Private", fees: 135000, rating: 3.9, placement: 76, highestPackage: 1100000, averagePackage: 420000, description: "CBIT is a popular private engineering college with active placements.", courseFee: 135000 },
  { name: "MVSR Engineering", city: "Hyderabad", state: "Telangana", established: 1981, type: "Private", fees: 125000, rating: 3.8, placement: 75, highestPackage: 1000000, averagePackage: 400000, description: "MVSR provides hands-on training and regional placement opportunities.", courseFee: 125000 },
  { name: "VNR VJIET", city: "Hyderabad", state: "Telangana", established: 1995, type: "Private", fees: 125000, rating: 3.9, placement: 77, highestPackage: 1100000, averagePackage: 420000, description: "VNR VJIET is well-connected to local industry and shows steady placements.", courseFee: 125000 },
  { name: "CVR College", city: "Hyderabad", state: "Telangana", established: 2001, type: "Private", fees: 125000, rating: 3.8, placement: 74, highestPackage: 950000, averagePackage: 380000, description: "CVR College focuses on practical engineering education and campus life.", courseFee: 125000 },
  { name: "Vasavi College", city: "Hyderabad", state: "Telangana", established: 1981, type: "Private", fees: 125000, rating: 3.9, placement: 78, highestPackage: 1200000, averagePackage: 450000, description: "Vasavi College is a reputed private college with active placement drives.", courseFee: 125000 },
  { name: "Chaitanya Bharathi", city: "Gandipet", state: "Telangana", established: 1979, type: "Private", fees: 120000, rating: 3.8, placement: 73, highestPackage: 900000, averagePackage: 360000, description: "Chaitanya Bharathi offers solid programs and campus opportunities.", courseFee: 120000 },
  { name: "SR Engineering", city: "Warangal", state: "Telangana", established: 2002, type: "Private", fees: 120000, rating: 3.7, placement: 71, highestPackage: 800000, averagePackage: 340000, description: "SR Engineering is regionally focused and growing its placement record.", courseFee: 120000 },
  { name: "CMR Engineering", city: "Hyderabad", state: "Telangana", established: 2010, type: "Private", fees: 120000, rating: 3.6, placement: 70, highestPackage: 750000, averagePackage: 320000, description: "CMR Engineering provides practical courses and local recruitment opportunities.", courseFee: 120000 },
]

const mhColleges: CollegeData[] = [
  { name: "COEP Pune", city: "Pune", state: "Maharashtra", established: 1854, type: "Government", fees: 85000, rating: 4.2, placement: 88, highestPackage: 2200000, averagePackage: 650000, description: "COEP Pune is a historic engineering college with strong academics and placements.", courseFee: 85000 },
  { name: "VJTI Mumbai", city: "Mumbai", state: "Maharashtra", established: 1887, type: "Government", fees: 85000, rating: 4.3, placement: 89, highestPackage: 2500000, averagePackage: 700000, description: "VJTI Mumbai is a reputed government institute known for industry connections.", courseFee: 85000 },
  { name: "ICT Mumbai", city: "Mumbai", state: "Maharashtra", established: 1933, type: "Government", fees: 85000, rating: 4.1, placement: 86, highestPackage: 2000000, averagePackage: 600000, description: "ICT Mumbai offers strong technical programs and steady placements.", courseFee: 85000 },
  { name: "Walchand Sangli", city: "Sangli", state: "Maharashtra", established: 1947, type: "Government", fees: 85000, rating: 3.9, placement: 80, highestPackage: 1200000, averagePackage: 480000, description: "Walchand Sangli is a respected college with solid regional placements.", courseFee: 85000 },
  { name: "SPIT Mumbai", city: "Mumbai", state: "Maharashtra", established: 2005, type: "Private", fees: 145000, rating: 4.0, placement: 82, highestPackage: 1800000, averagePackage: 550000, description: "SPIT Mumbai is a prominent private institute with strong industry links.", courseFee: 145000 },
]

const kaColleges: CollegeData[] = [
  { name: "RV College Bangalore", city: "Bengaluru", state: "Karnataka", established: 1963, type: "Private", fees: 220000, rating: 4.2, placement: 88, highestPackage: 2200000, averagePackage: 750000, description: "RV College is a leading private college with strong industry placement links.", courseFee: 220000 },
  { name: "BMS College", city: "Bengaluru", state: "Karnataka", established: 1946, type: "Private", fees: 220000, rating: 4.1, placement: 86, highestPackage: 2000000, averagePackage: 700000, description: "BMS College is well-known for quality teaching and placements in Bengaluru.", courseFee: 220000 },
  { name: "MSRIT Bangalore", city: "Bengaluru", state: "Karnataka", established: 1962, type: "Private", fees: 200000, rating: 4.0, placement: 84, highestPackage: 1800000, averagePackage: 650000, description: "MSRIT is a reputed private institute with consistent placement records.", courseFee: 200000 },
  { name: "PES University", city: "Bengaluru", state: "Karnataka", established: 1972, type: "Deemed", fees: 220000, rating: 4.1, placement: 85, highestPackage: 2000000, averagePackage: 700000, description: "PES University offers strong academic programs and placement support.", courseFee: 220000 },
  { name: "NIE Mysore", city: "Mysuru", state: "Karnataka", established: 1946, type: "Private", fees: 180000, rating: 3.9, placement: 80, highestPackage: 1200000, averagePackage: 500000, description: "NIE Mysore focuses on practical engineering education and regional recruiters.", courseFee: 180000 },
]

const privateUnis: CollegeData[] = [
  { name: "VIT Vellore", city: "Vellore", state: "Tamil Nadu", established: 1984, type: "Deemed", fees: 320000, rating: 4.3, placement: 88, highestPackage: 2500000, averagePackage: 700000, description: "VIT Vellore is a top private university known for strong placements and industry relations.", courseFee: 320000 },
  { name: "BITS Pilani", city: "Pilani", state: "Rajasthan", established: 1964, type: "Deemed", fees: 320000, rating: 4.5, placement: 92, highestPackage: 3000000, averagePackage: 1100000, description: "BITS Pilani is famed for its rigorous academics and excellent placements.", courseFee: 320000 },
  { name: "Manipal University", city: "Manipal", state: "Karnataka", established: 1953, type: "Deemed", fees: 300000, rating: 4.0, placement: 82, highestPackage: 2000000, averagePackage: 600000, description: "Manipal University offers a broad set of programs and good placements.", courseFee: 300000 },
  { name: "SRM Chennai", city: "Chennai", state: "Tamil Nadu", established: 1985, type: "Deemed", fees: 300000, rating: 3.9, placement: 80, highestPackage: 1800000, averagePackage: 550000, description: "SRM Chennai is a large private university with active campus recruitment.", courseFee: 300000 },
  { name: "Amity University", city: "Noida", state: "Uttar Pradesh", established: 2005, type: "Private", fees: 280000, rating: 3.8, placement: 78, highestPackage: 1500000, averagePackage: 480000, description: "Amity University is recognized for its industry partnerships and diverse programs.", courseFee: 280000 },
  { name: "Symbiosis Pune", city: "Pune", state: "Maharashtra", established: 2002, type: "Deemed", fees: 300000, rating: 4.0, placement: 81, highestPackage: 1600000, averagePackage: 520000, description: "Symbiosis Pune provides strong industry links and vibrant campus life.", courseFee: 300000 },
  { name: "Thapar University", city: "Patiala", state: "Punjab", established: 1956, type: "Deemed", fees: 300000, rating: 4.1, placement: 83, highestPackage: 1800000, averagePackage: 560000, description: "Thapar University is respected for academics and consistent placements.", courseFee: 300000 },
  { name: "Lovely Professional University", city: "Phagwara", state: "Punjab", established: 2005, type: "Private", fees: 280000, rating: 3.7, placement: 75, highestPackage: 1400000, averagePackage: 420000, description: "LPU is a large private university with a wide range of courses and campus recruitment.", courseFee: 280000 },
]

const courseNames = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
]

function resolveImageUrl(name: string) {
  // IIT specific images
  if (name === "IIT Bombay") return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/IIT_Bombay_Logo.svg/800px-IIT_Bombay_Logo.svg.png"
  if (name === "IIT Delhi") return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/IIT_Delhi_logo.png/800px-IIT_Delhi_logo.png"
  if (name === "IIT Madras") return "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/800px-IIT_Madras_Logo.svg.png"
  if (name === "IIT Kanpur") return "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/IIT_Kanpur_Logo.svg/800px-IIT_Kanpur_Logo.svg.png"
  if (name === "IIT Kharagpur") return "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/IIT_Kharagpur_Logo.svg/800px-IIT_Kharagpur_Logo.svg.png"
  if (name === "IIT Roorkee") return "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/IIT_Roorkee_Logo.svg/800px-IIT_Roorkee_Logo.svg.png"
  if (name === "IIT Hyderabad") return "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/IIT_Hyderabad_Logo.png/800px-IIT_Hyderabad_Logo.png"
  if (name === "IIT Guwahati") return "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/IIT_Guwahati_Logo.svg/800px-IIT_Guwahati_Logo.svg.png"

  // NIT specific images
  if (name === "NIT Trichy") return "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/NIT_Trichy_Logo.png/800px-NIT_Trichy_Logo.png"
  if (name === "NIT Warangal") return "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/NIT_Warangal_Logo.png/800px-NIT_Warangal_Logo.png"
  if (name === "NIT Surathkal") return "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/NITK_Logo.png/800px-NITK_Logo.png"

  // AP colleges
  if (name.includes("KL University") || name.includes("KL University Vijayawada")) return "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/KL_University_logo.png/800px-KL_University_logo.png"
  if (name.includes("GITAM")) return "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/GITAM_University_logo.png/800px-GITAM_University_logo.png"
  if (name.includes("Andhra University")) return "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Andhra_University_seal.png/800px-Andhra_University_seal.png"
  if (name.startsWith("Shri Vishnu Engineering College for Women")) return "https://www.srivishnu.ac.in/images/logo.png"

  // Private universities
  if (name.includes("VIT Vellore")) return "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Vellore_Institute_of_Technology_seal_2017.svg/800px-Vellore_Institute_of_Technology_seal_2017.svg.png"
  if (name.includes("BITS Pilani")) return "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/800px-BITS_Pilani-Logo.svg.png"
  if (name.includes("Manipal")) return "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Manipal_Academy_of_Higher_Education_logo.png/800px-Manipal_Academy_of_Higher_Education_logo.png"
  if (name.includes("SRM")) return "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/SRM_University_logo.png/800px-SRM_University_logo.png"

  // Default: picsum with encoded name
  return `https://picsum.photos/seed/${encodeURIComponent(name)}/800/400`
}

const studentReviews = [
  { name: "Aarav Sharma", comment: "Excellent campus life, world-class labs, and outstanding placement ratios." },
  { name: "Ananya Patel", comment: "Very good faculty, but academic competition is highly intense." },
  { name: "Rahul Verma", comment: "State of the art infrastructure. Placements are solid for tech branches." },
  { name: "Neha Reddy", comment: "Fees are slightly high but ROI is completely worth it." },
  { name: "Sai Kiran", comment: "Research environment is excellent. Hostel food could be improved." },
  { name: "Sneha Kulkarni", comment: "Sports and cultural fests are super fun. Great faculty guidance." },
]

async function main() {
  console.log("Preparing to seed colleges (will only add missing entries)...")

  // 1. IITs Seeding
  for (let i = 0; i < iits.length; i++) {
    const coll = iits[i]!
    const exists = await prisma.college.findFirst({ where: { name: coll.name } })
    if (exists) {
      console.log(`Skipping existing college: ${coll.name}`)
      continue
    }
    const college = await prisma.college.create({
      data: {
        name: coll.name,
        city: coll.city,
        state: coll.state,
        fees: coll.fees ?? 220000,
        rating: coll.rating ?? 4.6 + (iits.length - i) * 0.03,
        placement: coll.placement ?? 90 + (iits.length - i),
        highestPackage: coll.highestPackage ?? 15000000,
        averagePackage: coll.averagePackage ?? 1800000,
        established: coll.established,
        type: coll.type ?? "Government",
        description: coll.description ?? `${coll.name} is one of India's premier public technical universities. Known for its rigorous academic curriculum and strong research output.`,
        imageUrl: resolveImageUrl(coll.name),
      },
    })
    await seedCourses(college.id, coll.courseFee ?? 200000)
    await seedReviews(college.id)
    await seedCutoffs(college.id, "JEE Advanced", i, iits.length, {
      General: [1, 5000],
      OBC: [5001, 12000],
      SC: [12001, 30000],
      ST: [30001, 50000],
      EWS: [4001, 8000],
    })
  }

  // 2. NITs Seeding
  for (let i = 0; i < nits.length; i++) {
    const coll = nits[i]!
    const exists = await prisma.college.findFirst({ where: { name: coll.name } })
    if (exists) {
      console.log(`Skipping existing college: ${coll.name}`)
      continue
    }
    const college = await prisma.college.create({
      data: {
        name: coll.name,
        city: coll.city,
        state: coll.state,
        fees: coll.fees ?? 140000,
        rating: coll.rating ?? 4.1 + (nits.length - i) * 0.02,
        placement: coll.placement ?? 80 + Math.floor((nits.length - i) / 2),
        highestPackage: coll.highestPackage ?? 4500000,
        averagePackage: coll.averagePackage ?? 900000,
        established: coll.established,
        type: coll.type ?? "Government",
        description: coll.description ?? `${coll.name} is a well-regarded NIT with strong engineering programs and solid placement records.`,
        imageUrl: resolveImageUrl(coll.name),
      },
    })
    await seedCourses(college.id, coll.courseFee ?? 130000)
    await seedReviews(college.id)
    await seedCutoffs(college.id, "JEE Main", i, nits.length, {
      General: [5000, 50000],
      OBC: [50001, 90000],
      SC: [90001, 150000],
      ST: [150001, 250000],
    })
  }

  // 3. IIITs Seeding (5)
  for (let i = 0; i < iiits.length; i++) {
    const coll = iiits[i]!
    const exists = await prisma.college.findFirst({ where: { name: coll.name } })
    if (exists) {
      console.log(`Skipping existing college: ${coll.name}`)
      continue
    }
    const college = await prisma.college.create({
      data: {
        name: coll.name,
        city: coll.city,
        state: coll.state,
        fees: coll.fees ?? 300000,
        rating: coll.rating ?? 4.0 + (iiits.length - i) * 0.05,
        placement: coll.placement ?? 85 + (iiits.length - i),
        highestPackage: coll.highestPackage ?? 5000000,
        averagePackage: coll.averagePackage ?? 1200000,
        established: coll.established,
        type: coll.type ?? "Private",
        description: coll.description ?? `${coll.name} focuses heavily on Computer Science, IT, and software research.`,
        imageUrl: resolveImageUrl(coll.name),
      },
    })
    await seedCourses(college.id, coll.courseFee ?? 280000)
    await seedReviews(college.id)
    await seedCutoffs(college.id, "JEE Main", i, iiits.length, {
      General: [8000, 30000],
      OBC: [30001, 45000],
      SC: [45001, 70000],
      ST: [70001, 95000],
    })
  }

  // 4. AP Colleges Seeding (10)
  for (let i = 0; i < apColleges.length; i++) {
    const coll = apColleges[i]!
    const exists = await prisma.college.findFirst({ where: { name: coll.name } })
    if (exists) {
      console.log(`Skipping existing college: ${coll.name}`)
      continue
    }

    // Special-case: Shri Vishnu Engineering College for Women
    if (coll.name.startsWith("Shri Vishnu Engineering College for Women")) {
      const college = await prisma.college.create({
        data: {
          name: coll.name,
          city: coll.city,
          state: coll.state,
          fees: coll.fees ?? 85000,
          rating: coll.rating ?? 4.3,
          placement: coll.placement ?? 89,
          highestPackage: coll.highestPackage ?? 1800000,
          averagePackage: coll.averagePackage ?? 650000,
          established: coll.established,
          type: coll.type ?? "Private",
          description: coll.description ?? "A premier women's engineering college in West Godavari district, known for excellent placements and academic excellence",
          imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
        },
      })

      // Specific courses
      const svCourses = [
        "B.Tech CSE",
        "B.Tech ECE",
        "B.Tech EEE",
        "B.Tech Civil",
        "B.Tech Mechanical",
      ]
      for (const cn of svCourses) {
        await prisma.course.create({ data: { name: cn, duration: "4 Years", fees: 85000, collegeId: college.id } })
      }

      // Six positive female reviews
      const svReviews = [
        { name: "Sowmya R", comment: "Supportive faculty and excellent placement support.", rating: 4.5 },
        { name: "Kavya S", comment: "Great environment for women, safe campus and good labs.", rating: 4.4 },
        { name: "Aishwarya P", comment: "Placements are strong and training is practical.", rating: 4.3 },
        { name: "Pooja M", comment: "Very encouraging faculty mentors and active clubs.", rating: 4.2 },
        { name: "Radhika T", comment: "Excellent peer groups and strong campus recruitment.", rating: 4.4 },
        { name: "Isha K", comment: "Hands-on projects and consistent placement drives.", rating: 4.3 },
      ]
      for (const r of svReviews) {
        await prisma.review.create({ data: { studentName: r.name, rating: r.rating, comment: r.comment, collegeId: college.id } })
      }

      await seedCutoffs(college.id, "AP EAPCET", i, apColleges.length, {
        General: [1, 15000],
        "BC-A": [15001, 30000],
        "BC-B": [15001, 35000],
        SC: [35001, 70000],
        ST: [70001, 100000],
      })
      continue
    }

    const college = await prisma.college.create({
      data: {
        name: coll.name,
        city: coll.city,
        state: coll.state,
        fees: coll.type === "Government" ? 45000 : coll.fees ?? 120000,
        rating: coll.rating ?? 3.8 + (apColleges.length - i) * 0.02,
        placement: coll.placement ?? 70 + Math.floor((apColleges.length - i) * 1.2),
        highestPackage: coll.highestPackage ?? 1200000,
        averagePackage: coll.averagePackage ?? 400000,
        established: coll.established,
        type: coll.type,
        description: coll.description ?? `${coll.name} is one of the well-known engineering colleges in Andhra Pradesh.`,
        imageUrl: resolveImageUrl(coll.name),
      },
    })
    await seedCourses(college.id, coll.type === "Government" ? 40000 : coll.fees ?? 110000)
    await seedReviews(college.id)
    await seedCutoffs(college.id, "AP EAPCET", i, apColleges.length, {
      General: [1, 20000],
      "BC-A": [20001, 35000],
      "BC-B": [20001, 40000],
      SC: [40001, 70000],
      ST: [70001, 100000],
    })
  }

  // 5. TS Colleges Seeding (10)
  for (let i = 0; i < tsColleges.length; i++) {
    const coll = tsColleges[i]!
    const exists = await prisma.college.findFirst({ where: { name: coll.name } })
    if (exists) {
      console.log(`Skipping existing college: ${coll.name}`)
      continue
    }
    const college = await prisma.college.create({
      data: {
        name: coll.name,
        city: coll.city,
        state: coll.state,
        fees: coll.type === "Government" ? 50000 : coll.fees ?? 135000,
        rating: coll.rating ?? 3.9 + (tsColleges.length - i) * 0.02,
        placement: coll.placement ?? 74 + Math.floor((tsColleges.length - i) * 1.2),
        highestPackage: coll.highestPackage ?? 1500000,
        averagePackage: coll.averagePackage ?? 450000,
        established: coll.established,
        type: coll.type,
        description: coll.description ?? `${coll.name} is a leading college in Telangana.`,
        imageUrl: resolveImageUrl(coll.name),
      },
    })
    await seedCourses(college.id, coll.type === "Government" ? 45000 : coll.fees ?? 125000)
    await seedReviews(college.id)
    await seedCutoffs(college.id, "TS EAPCET", i, tsColleges.length, {
      General: [1, 18000],
      "BC-A": [18001, 35000],
      SC: [35001, 65000],
      ST: [65001, 90000],
    })
  }

  // 6. Maharashtra Colleges Seeding (5)
  for (let i = 0; i < mhColleges.length; i++) {
    const coll = mhColleges[i]!
    const exists = await prisma.college.findFirst({ where: { name: coll.name } })
    if (exists) {
      console.log(`Skipping existing college: ${coll.name}`)
      continue
    }
    const college = await prisma.college.create({
      data: {
        name: coll.name,
        city: coll.city,
        state: coll.state,
        fees: coll.type === "Government" ? 85000 : coll.fees ?? 145000,
        rating: coll.rating ?? 4.1 + (mhColleges.length - i) * 0.03,
        placement: coll.placement ?? 78 + (mhColleges.length - i) * 1,
        highestPackage: coll.highestPackage ?? 2000000,
        averagePackage: coll.averagePackage ?? 650000,
        established: coll.established,
        type: coll.type,
        description: coll.description ?? `${coll.name} is a prestigious engineering college in Maharashtra.`,
        imageUrl: resolveImageUrl(coll.name),
      },
    })
    await seedCourses(college.id, coll.type === "Government" ? 80000 : coll.fees ?? 135000)
    await seedReviews(college.id)
    await seedCutoffs(college.id, "MHT CET", i, mhColleges.length, {
      General: [1, 15000],
      OBC: [15001, 30000],
      SC: [30001, 50000],
    })
  }

  // 7. Karnataka Colleges Seeding (5)
  for (let i = 0; i < kaColleges.length; i++) {
    const coll = kaColleges[i]!
    const exists = await prisma.college.findFirst({ where: { name: coll.name } })
    if (exists) {
      console.log(`Skipping existing college: ${coll.name}`)
      continue
    }
    const college = await prisma.college.create({
      data: {
        name: coll.name,
        city: coll.city,
        state: coll.state,
        fees: coll.fees ?? 220000,
        rating: coll.rating ?? 4.0 + (kaColleges.length - i) * 0.02,
        placement: coll.placement ?? 78 + (kaColleges.length - i) * 1,
        highestPackage: coll.highestPackage ?? 2200000,
        averagePackage: coll.averagePackage ?? 700000,
        established: coll.established,
        type: coll.type,
        description: coll.description ?? `${coll.name} is a top technical destination in Karnataka.`,
        imageUrl: resolveImageUrl(coll.name),
      },
    })
    await seedCourses(college.id, coll.courseFee ?? 200000)
    await seedReviews(college.id)
    await seedCutoffs(college.id, "KCET", i, kaColleges.length, {
      GM: [1, 10000],
      OBC: [10001, 25000],
      SC: [25001, 40000],
    })
  }

  // 8. Private Universities Seeding (8)
  for (let i = 0; i < privateUnis.length; i++) {
    const coll = privateUnis[i]!
    const exists = await prisma.college.findFirst({ where: { name: coll.name } })
    if (exists) {
      console.log(`Skipping existing college: ${coll.name}`)
      continue
    }
    const college = await prisma.college.create({
      data: {
        name: coll.name,
        city: coll.city,
        state: coll.state,
        fees: coll.fees ?? 320000,
        rating: coll.rating ?? 3.9 + (privateUnis.length - i) * 0.02,
        placement: coll.placement ?? 80 + Math.floor((privateUnis.length - i) / 2),
        highestPackage: coll.highestPackage ?? 2500000,
        averagePackage: coll.averagePackage ?? 600000,
        established: coll.established,
        type: coll.type,
        description: coll.description ?? `${coll.name} is a well-known private university.`,
        imageUrl: resolveImageUrl(coll.name),
      },
    })
    await seedCourses(college.id, coll.courseFee ?? 300000)
    await seedReviews(college.id)
    await seedCutoffs(college.id, "JEE Main", i, privateUnis.length, {
      General: [50000, 200000],
    })
  }

  console.log("Database seeding completed successfully!")
}

// Helpers to seed sub-tables

async function seedCourses(collegeId: string, baseFee: number) {
  const coursesToCreate = courseNames.slice(0, 3 + Math.floor(Math.random() * 2)) // 3 to 4 courses
  for (const name of coursesToCreate) {
    const fee = baseFee + Math.floor((Math.random() - 0.5) * 40000)
    await prisma.course.create({
      data: {
        name,
        duration: "4 Years",
        fees: Math.max(25000, fee),
        collegeId,
      },
    })
  }
}

async function seedReviews(collegeId: string) {
  const reviewsCount = 3 + Math.floor(Math.random() * 3) // 3 to 5 reviews
  const selectedReviews = studentReviews
    .sort(() => 0.5 - Math.random())
    .slice(0, reviewsCount)

  for (const rev of selectedReviews) {
    await prisma.review.create({
      data: {
        studentName: rev.name,
        rating: 3.5 + Math.random() * 1.5,
        comment: rev.comment,
        collegeId,
      },
    })
  }
}

async function seedCutoffs(
  collegeId: string,
  exam: string,
  index: number,
  total: number,
  ranges: Record<string, [number, number]>
) {
  // We want to generate cutoffs for both 2023 and 2024
  const years = [2023, 2024]
  const ratio = index / total // 0 to 1 based on quality ranking in category

  for (const year of years) {
    for (const [category, [minRank, maxRank]] of Object.entries(ranges)) {
      // Best colleges get smaller ranks, lower ranked colleges get higher closing ranks
      const spread = maxRank - minRank
      
      // Calculate realistic open and close ranks
      const baseOpen = minRank + ratio * spread * 0.7
      const openRank = Math.max(
        minRank,
        Math.floor(baseOpen + (year === 2023 ? 50 : 0) + (Math.random() - 0.5) * 100)
      )
      
      const closeRank = Math.min(
        maxRank,
        Math.floor(openRank + spread * 0.2 + (Math.random() * 150))
      )

      await prisma.cutoff.create({
        data: {
          collegeId,
          exam,
          category,
          year,
          openRank: Math.max(1, openRank),
          closeRank: Math.max(openRank + 1, closeRank),
        },
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
