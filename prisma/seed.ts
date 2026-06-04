import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// College lists divided by category
const iits = [
  { name: "IIT Bombay", city: "Mumbai", state: "Maharashtra", established: 1958 },
  { name: "IIT Delhi", city: "New Delhi", state: "Delhi", established: 1961 },
  { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", established: 1959 },
  { name: "IIT Kanpur", city: "Kanpur", state: "Uttar Pradesh", established: 1959 },
  { name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal", established: 1951 },
  { name: "IIT Roorkee", city: "Roorkee", state: "Uttarakhand", established: 1847 },
  { name: "IIT Guwahati", city: "Guwahati", state: "Assam", established: 1994 },
  { name: "IIT Hyderabad", city: "Hyderabad", state: "Telangana", established: 2008 },
  { name: "IIT Bhubaneswar", city: "Bhubaneswar", state: "Odisha", established: 2008 },
  { name: "IIT Gandhinagar", city: "Gandhinagar", state: "Gujarat", established: 2008 },
  { name: "IIT Jodhpur", city: "Jodhpur", state: "Rajasthan", established: 2008 },
  { name: "IIT Patna", city: "Patna", state: "Bihar", established: 2008 },
  { name: "IIT Mandi", city: "Mandi", state: "Himachal Pradesh", established: 2009 },
  { name: "IIT Indore", city: "Indore", state: "Madhya Pradesh", established: 2009 },
  { name: "IIT (BHU) Varanasi", city: "Varanasi", state: "Uttar Pradesh", established: 1919 },
  { name: "IIT Palakkad", city: "Palakkad", state: "Kerala", established: 2015 },
  { name: "IIT Tirupati", city: "Tirupati", state: "Andhra Pradesh", established: 2015 },
  { name: "IIT Dhanbad (ISM)", city: "Dhanbad", state: "Jharkhand", established: 1926 },
  { name: "IIT Bhilai", city: "Bhilai", state: "Chhattisgarh", established: 2016 },
  { name: "IIT Goa", city: "Goa", state: "Goa", established: 2016 },
  { name: "IIT Jammu", city: "Jammu", state: "Jammu & Kashmir", established: 2016 },
  { name: "IIT Dharwad", city: "Dharwad", state: "Karnataka", established: 2016 },
  { name: "IIT Ropar", city: "Rupnagar", state: "Punjab", established: 2008 },
]

const nits = [
  { name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu", established: 1964 },
  { name: "NIT Warangal", city: "Warangal", state: "Telangana", established: 1959 },
  { name: "NIT Surathkal", city: "Mangaluru", state: "Karnataka", established: 1960 },
  { name: "NIT Calicut", city: "Kozhikode", state: "Kerala", established: 1961 },
  { name: "NIT Jaipur", city: "Jaipur", state: "Rajasthan", established: 1963 },
  { name: "NIT Allahabad", city: "Prayagraj", state: "Uttar Pradesh", established: 1961 },
  { name: "NIT Rourkela", city: "Rourkela", state: "Odisha", established: 1961 },
  { name: "NIT Kurukshetra", city: "Kurukshetra", state: "Haryana", established: 1963 },
  { name: "NIT Durgapur", city: "Durgapur", state: "West Bengal", established: 1960 },
  { name: "NIT Bhopal", city: "Bhopal", state: "Madhya Pradesh", established: 1960 },
  { name: "NIT Silchar", city: "Silchar", state: "Assam", established: 1967 },
  { name: "NIT Agartala", city: "Agartala", state: "Tripura", established: 1965 },
  { name: "NIT Hamirpur", city: "Hamirpur", state: "Himachal Pradesh", established: 1986 },
  { name: "NIT Jalandhar", city: "Jalandhar", state: "Punjab", established: 1987 },
  { name: "NIT Raipur", city: "Raipur", state: "Chhattisgarh", established: 1956 },
  { name: "NIT Srinagar", city: "Srinagar", state: "Jammu & Kashmir", established: 1960 },
  { name: "NIT Manipur", city: "Imphal", state: "Manipur", established: 2010 },
  { name: "NIT Meghalaya", city: "Shillong", state: "Meghalaya", established: 2011 },
  { name: "NIT Mizoram", city: "Aizawl", state: "Mizoram", established: 2010 },
  { name: "NIT Nagaland", city: "Chümoukedima", state: "Nagaland", established: 2010 },
  { name: "NIT Sikkim", city: "Rangpo", state: "Sikkim", established: 2010 },
  { name: "NIT Arunachal Pradesh", city: "Yupia", state: "Arunachal Pradesh", established: 2010 },
  { name: "NIT Delhi", city: "New Delhi", state: "Delhi", established: 2010 },
  { name: "NIT Goa", city: "Ponda", state: "Goa", established: 2010 },
  { name: "NIT Puducherry", city: "Puducherry", state: "Puducherry", established: 2010 },
  { name: "NIT Uttarakhand", city: "Srinagar", state: "Uttarakhand", established: 2010 },
  { name: "NIT Andhra Pradesh", city: "Tadepalligudem", state: "Andhra Pradesh", established: 2015 },
  { name: "NIT Surat", city: "Surat", state: "Gujarat", established: 2015 },
  { name: "NIT Patna", city: "Patna", state: "Bihar", established: 2004 },
]

const iiits = [
  { name: "IIIT Hyderabad", city: "Hyderabad", state: "Telangana", established: 1998, type: "Private" },
  { name: "IIIT Delhi", city: "New Delhi", state: "Delhi", established: 2008, type: "Government" },
  { name: "IIIT Allahabad", city: "Prayagraj", state: "Uttar Pradesh", established: 1999, type: "Government" },
  { name: "IIIT Bangalore", city: "Bengaluru", state: "Karnataka", established: 1999, type: "Deemed" },
  { name: "IIIT Pune", city: "Pune", state: "Maharashtra", established: 2016, type: "Government" },
]

const apColleges = [
  { name: "Shri Vishnu Engineering College for Women (Bhimavaram)", city: "Bhimavaram", state: "Andhra Pradesh", established: 1997, type: "Private", fees: 85000, rating: 4.3, placement: 89, highestPackage: 1800000, averagePackage: 650000 },
  { name: "JNTUK Kakinada", city: "Kakinada", state: "Andhra Pradesh", established: 1946, type: "Government" },
  { name: "Andhra University Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 1926, type: "Government" },
  { name: "SVEC Tirupati", city: "Tirupati", state: "Andhra Pradesh", established: 1996, type: "Private" },
  { name: "VVIT Guntur", city: "Guntur", state: "Andhra Pradesh", established: 2007, type: "Private" },
  { name: "Vignan University Guntur", city: "Guntur", state: "Andhra Pradesh", established: 1997, type: "Deemed" },
  { name: "KL University Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 1980, type: "Deemed" },
  { name: "Gayatri Vidya Parishad Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 1996, type: "Private" },
  { name: "Anil Neerukonda Institute Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 2001, type: "Private" },
  { name: "GITAM Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 1980, type: "Deemed" },
  { name: "RVR and JC College Guntur", city: "Guntur", state: "Andhra Pradesh", established: 1985, type: "Private" },
  { name: "Bapatla Engineering College", city: "Bapatla", state: "Andhra Pradesh", established: 1981, type: "Private" },
  { name: "Vasireddy Venkatadri Institute Guntur", city: "Guntur", state: "Andhra Pradesh", established: 1981, type: "Private" },
  { name: "Narasaraopeta Engineering College", city: "Narasaraopet", state: "Andhra Pradesh", established: 1981, type: "Private" },
  { name: "Sri Vasavi Engineering College Tadepalligudem", city: "Tadepalligudem", state: "Andhra Pradesh", established: 1998, type: "Private" },
  { name: "Godavari Institute of Engineering Rajahmundry", city: "Rajahmundry", state: "Andhra Pradesh", established: 1998, type: "Private" },
  { name: "Kallam Haranadhareddy Institute Guntur", city: "Guntur", state: "Andhra Pradesh", established: 2008, type: "Private" },
  { name: "PVPSIT Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 2008, type: "Private" },
  { name: "Sasi Institute of Technology Tadepalligudem", city: "Tadepalligudem", state: "Andhra Pradesh", established: 2001, type: "Private" },
  { name: "Pragati Engineering College Surampalem", city: "Surampalem", state: "Andhra Pradesh", established: 2001, type: "Private" },
  { name: "Dhanekula Institute Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 2001, type: "Private" },
  { name: "Lakireddy Bali Reddy College Mylavaram", city: "Mylavaram", state: "Andhra Pradesh", established: 1981, type: "Private" },
  { name: "QIS College of Engineering Ongole", city: "Ongole", state: "Andhra Pradesh", established: 1998, type: "Private" },
  { name: "Avanthi Institute Visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", established: 2004, type: "Private" },
  { name: "Sri Sunflower College of Engineering Lankapalli", city: "Lankapalli", state: "Andhra Pradesh", established: 2006, type: "Private" },
  { name: "Vishnu Institute of Technology Bhimavaram", city: "Bhimavaram", state: "Andhra Pradesh", established: 2001, type: "Private" },
  { name: "RISE Krishna Sai Prakasam Group Ongole", city: "Ongole", state: "Andhra Pradesh", established: 2006, type: "Private" },
  { name: "Velagapudi Ramakrishna Siddhartha Engineering Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 1972, type: "Private" },
  { name: "PVP Siddhartha Institute Vijayawada", city: "Vijayawada", state: "Andhra Pradesh", established: 1996, type: "Private" },
  { name: "Chirala Engineering College", city: "Chirala", state: "Andhra Pradesh", established: 1981, type: "Private" },
]

const tsColleges = [
  { name: "JNTUH Hyderabad", city: "Hyderabad", state: "Telangana", established: 1965, type: "Government" },
  { name: "Osmania University", city: "Hyderabad", state: "Telangana", established: 1917, type: "Government" },
  { name: "CBIT Hyderabad", city: "Hyderabad", state: "Telangana", established: 1979, type: "Private" },
  { name: "MVSR Engineering", city: "Hyderabad", state: "Telangana", established: 1981, type: "Private" },
  { name: "VNR VJIET", city: "Hyderabad", state: "Telangana", established: 1995, type: "Private" },
  { name: "CVR College", city: "Hyderabad", state: "Telangana", established: 2001, type: "Private" },
  { name: "Vasavi College", city: "Hyderabad", state: "Telangana", established: 1981, type: "Private" },
  { name: "Chaitanya Bharathi", city: "Gandipet", state: "Telangana", established: 1979, type: "Private" },
  { name: "SR Engineering", city: "Warangal", state: "Telangana", established: 2002, type: "Private" },
  { name: "CMR Engineering", city: "Hyderabad", state: "Telangana", established: 2010, type: "Private" },
]

const mhColleges = [
  { name: "COEP Pune", city: "Pune", state: "Maharashtra", established: 1854, type: "Government" },
  { name: "VJTI Mumbai", city: "Mumbai", state: "Maharashtra", established: 1887, type: "Government" },
  { name: "ICT Mumbai", city: "Mumbai", state: "Maharashtra", established: 1933, type: "Government" },
  { name: "Walchand Sangli", city: "Sangli", state: "Maharashtra", established: 1947, type: "Government" },
  { name: "SPIT Mumbai", city: "Mumbai", state: "Maharashtra", established: 2005, type: "Private" },
]

const kaColleges = [
  { name: "RV College Bangalore", city: "Bengaluru", state: "Karnataka", established: 1963, type: "Private" },
  { name: "BMS College", city: "Bengaluru", state: "Karnataka", established: 1946, type: "Private" },
  { name: "MSRIT Bangalore", city: "Bengaluru", state: "Karnataka", established: 1962, type: "Private" },
  { name: "PES University", city: "Bengaluru", state: "Karnataka", established: 1972, type: "Deemed" },
  { name: "NIE Mysore", city: "Mysuru", state: "Karnataka", established: 1946, type: "Private" },
]

const privateUnis = [
  { name: "VIT Vellore", city: "Vellore", state: "Tamil Nadu", established: 1984, type: "Deemed" },
  { name: "BITS Pilani", city: "Pilani", state: "Rajasthan", established: 1964, type: "Deemed" },
  { name: "Manipal University", city: "Manipal", state: "Karnataka", established: 1953, type: "Deemed" },
  { name: "SRM Chennai", city: "Chennai", state: "Tamil Nadu", established: 1985, type: "Deemed" },
  { name: "Amity University", city: "Noida", state: "Uttar Pradesh", established: 2005, type: "Private" },
  { name: "Symbiosis Pune", city: "Pune", state: "Maharashtra", established: 2002, type: "Deemed" },
  { name: "Thapar University", city: "Patiala", state: "Punjab", established: 1956, type: "Deemed" },
  { name: "Lovely Professional University", city: "Phagwara", state: "Punjab", established: 2005, type: "Private" },
]

const courseNames = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
]

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
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
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
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
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
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
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
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
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
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
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
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
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
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
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
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(coll.name)}/800/400`,
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
