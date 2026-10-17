import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/userModel.js';
import Patient from './models/patientModel.js';
import Doctor from './models/doctorModel.js';
import Appointment from './models/appointmentModel.js';
import AppointmentRequest from './models/appointmentRequestModel.js';
import Invoice from './models/invoiceModel.js';
import Medicine from './models/medicineModel.js';
import Record from './models/recordModel.js';
import Settings from './models/settingsModel.js';

dotenv.config();

const daysFromNow = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(0, 0, 0, 0);
  return d;
};

const destroyData = async () => {
  await Promise.all([
    User.deleteMany(),
    Patient.deleteMany(),
    Doctor.deleteMany(),
    Appointment.deleteMany(),
    AppointmentRequest.deleteMany(),
    Invoice.deleteMany(),
    Medicine.deleteMany(),
    Record.deleteMany(),
    Settings.deleteMany(),
  ]);
  console.log('🗑️  All existing collections cleared');
};

const seedData = async () => {
  console.log('🌱 Starting comprehensive database seed for SmartClinic...');

  // ==========================================
  // 1. USERS: Admin, Receptionist, Doctors, Patients
  // ==========================================
  const adminUser = await User.create({
    name: 'Amina Warsame',
    email: 'admin@gmail.com',
    password: 'password123',
    phone: '+252611000001',
    role: 'admin',
  });

  const receptionUser = await User.create({
    name: 'Hodan Ali Cilmi',
    email: 'reception@gmail.com',
    password: 'password123',
    phone: '+252611000002',
    role: 'receptionist',
  });

  // Doctor User Logins
  const docUser1 = await User.create({
    name: 'Yusuf Hassan Warsame',
    email: 'dr.yusuf@gmail.com',
    password: 'password123',
    phone: '+252615551001',
    role: 'doctor',
  });

  const docUser2 = await User.create({
    name: 'Faduma Mohamed Nur',
    email: 'dr.faduma@gmail.com',
    password: 'password123',
    phone: '+252615551002',
    role: 'doctor',
  });

  const docUser3 = await User.create({
    name: 'Cabdiraxmaan Cilmi Geedi',
    email: 'dr.abdirahman@gmail.com',
    password: 'password123',
    phone: '+252615551003',
    role: 'doctor',
  });

  const docUser4 = await User.create({
    name: 'Deeqa Axmed Jaamac',
    email: 'dr.deeqa@gmail.com',
    password: 'password123',
    phone: '+252615551004',
    role: 'doctor',
  });

  const docUser5 = await User.create({
    name: 'Liibaan Cismaan Cali',
    email: 'dr.liban@gmail.com',
    password: 'password123',
    phone: '+252615551005',
    role: 'doctor',
  });

  const docUser6 = await User.create({
    name: 'Sarah Jenkins',
    email: 'dr.sarah@gmail.com',
    password: 'password123',
    phone: '+252615551006',
    role: 'doctor',
  });

  const docUser7 = await User.create({
    name: 'Rajesh Sharma',
    email: 'dr.rajesh@gmail.com',
    password: 'password123',
    phone: '+252615551007',
    role: 'doctor',
  });

  const docUser8 = await User.create({
    name: 'Elena Rostova',
    email: 'dr.elena@gmail.com',
    password: 'password123',
    phone: '+252615551008',
    role: 'doctor',
  });

  const docUser9 = await User.create({
    name: 'Michael Chen',
    email: 'dr.michael@gmail.com',
    password: 'password123',
    phone: '+252615551009',
    role: 'doctor',
  });

  // Patient User Logins (For testing Patient Portal)
  const patientUser1 = await User.create({
    name: 'Abdirahman Jama',
    email: 'patient@gmail.com',
    password: 'password123',
    phone: '+252617772001',
    role: 'patient',
  });

  const patientUser2 = await User.create({
    name: 'Sahra Mohamed',
    email: 'sahra@gmail.com',
    password: 'password123',
    phone: '+252617772002',
    role: 'patient',
  });

  const patientUser3 = await User.create({
    name: 'Guled Abdullahi',
    email: 'guled@gmail.com',
    password: 'password123',
    phone: '+252617772003',
    role: 'patient',
  });

  const patientUser4 = await User.create({
    name: 'Maryan Xaaji Nuur',
    email: 'maryan@gmail.com',
    password: 'password123',
    phone: '+252617772004',
    role: 'patient',
  });

  console.log('👤 Users created: Admin, Receptionist, 9 Doctors, 4 Patient portal logins');

  // ==========================================
  // 2. DOCTORS (Somali & International Specialists)
  // ==========================================
  const doctor1 = await Doctor.create({
    name: 'Yusuf Hassan Warsame',
    specialization: 'Cardiology',
    phone: docUser1.phone,
    email: docUser1.email,
    bio: 'Senior Consultant Cardiologist with 14 years of clinical experience in interventional cardiology, heart failure, and preventative cardiovascular care.',
    schedule: {
      days: ['Sunday', 'Monday', 'Wednesday', 'Thursday'],
      startTime: '08:30',
      endTime: '16:30',
    },
    consultationFee: 40,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    userId: docUser1._id,
    isAvailable: true,
  });

  const doctor2 = await Doctor.create({
    name: 'Faduma Mohamed Nur',
    specialization: 'Pediatrics',
    phone: docUser2.phone,
    email: docUser2.email,
    bio: 'Chief Pediatrician dedicated to neonatal care, infant nutrition, childhood developmental screening, and pediatric immunizations.',
    schedule: {
      days: ['Sunday', 'Tuesday', 'Thursday', 'Saturday'],
      startTime: '09:00',
      endTime: '17:00',
    },
    consultationFee: 35,
    image: 'https://images.unsplash.com/photo-1594824813501-48995a9dd65f?auto=format&fit=crop&w=600&q=80',
    userId: docUser2._id,
    isAvailable: true,
  });

  const doctor3 = await Doctor.create({
    name: 'Cabdiraxmaan Cilmi Geedi',
    specialization: 'Orthopedics',
    phone: docUser3.phone,
    email: docUser3.email,
    bio: 'Specialist in musculoskeletal trauma, joint reconstruction, sports injuries, and conservative arthritis therapy.',
    schedule: {
      days: ['Monday', 'Tuesday', 'Thursday'],
      startTime: '08:00',
      endTime: '16:00',
    },
    consultationFee: 45,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    userId: docUser3._id,
    isAvailable: true,
  });

  const doctor4 = await Doctor.create({
    name: 'Deeqa Axmed Jaamac',
    specialization: 'Gynecology',
    phone: docUser4.phone,
    email: docUser4.email,
    bio: 'Obstetrician & Gynecologist specializing in high-risk pregnancy care, women’s reproductive health, prenatal ultrasound, and postpartum wellness.',
    schedule: {
      days: ['Sunday', 'Monday', 'Wednesday', 'Saturday'],
      startTime: '09:00',
      endTime: '17:00',
    },
    consultationFee: 35,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    userId: docUser4._id,
    isAvailable: true,
  });

  const doctor5 = await Doctor.create({
    name: 'Liibaan Cismaan Cali',
    specialization: 'General Medicine',
    phone: docUser5.phone,
    email: docUser5.email,
    bio: 'Experienced Family Physician specializing in chronic disease management, adult preventative checkups, hypertension, and primary healthcare.',
    schedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startTime: '08:00',
      endTime: '16:00',
    },
    consultationFee: 25,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    userId: docUser5._id,
    isAvailable: true,
  });

  const doctor6 = await Doctor.create({
    name: 'Sarah Jenkins',
    specialization: 'Neurology',
    phone: docUser6.phone,
    email: docUser6.email,
    bio: 'Visiting Consultant Neurologist from the UK specializing in neurovascular disorders, chronic migraines, epilepsy, and neuropathy treatment.',
    schedule: {
      days: ['Monday', 'Wednesday', 'Saturday'],
      startTime: '10:00',
      endTime: '17:00',
    },
    consultationFee: 50,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    userId: docUser6._id,
    isAvailable: true,
  });

  const doctor7 = await Doctor.create({
    name: 'Rajesh Sharma',
    specialization: 'Oncology',
    phone: docUser7.phone,
    email: docUser7.email,
    bio: 'Senior Clinical Oncologist with over 16 years of expertise in cancer screening, chemotherapy planning, and multidisciplinary tumor therapy.',
    schedule: {
      days: ['Sunday', 'Tuesday', 'Thursday'],
      startTime: '09:00',
      endTime: '15:00',
    },
    consultationFee: 60,
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=600&q=80',
    userId: docUser7._id,
    isAvailable: true,
  });

  const doctor8 = await Doctor.create({
    name: 'Elena Rostova',
    specialization: 'Dermatology',
    phone: docUser8.phone,
    email: docUser8.email,
    bio: 'European board-certified Dermatologist focusing on inflammatory skin conditions, eczema, psoriasis, acne therapy, and dermatoscopy.',
    schedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Saturday'],
      startTime: '10:00',
      endTime: '16:00',
    },
    consultationFee: 40,
    image: 'https://images.unsplash.com/photo-1594824813636-f6b7c53d5a15?auto=format&fit=crop&w=600&q=80',
    userId: docUser8._id,
    isAvailable: true,
  });

  const doctor9 = await Doctor.create({
    name: 'Michael Chen',
    specialization: 'Urology',
    phone: docUser9.phone,
    email: docUser9.email,
    bio: 'Consultant Urologist and endourologist specializing in renal lithiasis (kidney stones), prostate care, urinary tract disorders, and minimally invasive procedures.',
    schedule: {
      days: ['Tuesday', 'Thursday', 'Friday'],
      startTime: '09:00',
      endTime: '17:00',
    },
    consultationFee: 45,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    userId: docUser9._id,
    isAvailable: true,
  });

  console.log('🩺 9 Doctors created with HD portraits, schedules, and bios');

  // ==========================================
  // 3. PATIENTS (Linked user accounts & walk-ins)
  // ==========================================
  const patient1 = await Patient.create({
    name: patientUser1.name,
    age: 34,
    gender: 'Male',
    bloodType: 'O+',
    phone: patientUser1.phone,
    email: patientUser1.email,
    address: 'Hodan District, Mogadishu',
    emergencyContact: { name: 'Fartun Jama', phone: '+252611000010', relationship: 'Sister' },
    allergies: ['Penicillin'],
    notes: 'Regular patient, history of mild angina and acid reflux.',
    registeredBy: receptionUser._id,
    userId: patientUser1._id,
  });

  const patient2 = await Patient.create({
    name: patientUser2.name,
    age: 28,
    gender: 'Female',
    bloodType: 'A+',
    phone: patientUser2.phone,
    email: patientUser2.email,
    address: 'Wadajir District, Mogadishu',
    emergencyContact: { name: 'Mohamed Ali', phone: '+252611000011', relationship: 'Father' },
    allergies: [],
    notes: 'Prenatal care and routine ultrasound consultations.',
    registeredBy: receptionUser._id,
    userId: patientUser2._id,
  });

  const patient3 = await Patient.create({
    name: patientUser3.name,
    age: 52,
    gender: 'Male',
    bloodType: 'B+',
    phone: patientUser3.phone,
    email: patientUser3.email,
    address: 'Cabdicasis District, Mogadishu',
    emergencyContact: { name: 'Ayaan Guled', phone: '+252611000012', relationship: 'Daughter' },
    allergies: ['Sulfa drugs'],
    notes: 'Hypertensive, on regular monthly blood pressure reviews.',
    registeredBy: receptionUser._id,
    userId: patientUser3._id,
  });

  const patient4 = await Patient.create({
    name: patientUser4.name,
    age: 41,
    gender: 'Female',
    bloodType: 'AB+',
    phone: patientUser4.phone,
    email: patientUser4.email,
    address: 'Shangaani District, Mogadishu',
    emergencyContact: { name: 'Cumar Xaaji', phone: '+252611000013', relationship: 'Brother' },
    allergies: ['Aspirin'],
    notes: 'Under neurological monitoring for chronic migraine syndrome.',
    registeredBy: receptionUser._id,
    userId: patientUser4._id,
  });

  // Walk-in Patients registered by Reception
  const patient5 = await Patient.create({
    name: 'Cabdulle Nuur Shire',
    age: 46,
    gender: 'Male',
    bloodType: 'B-',
    phone: '+252611223301',
    address: 'Kaaran District, Mogadishu',
    emergencyContact: { name: 'Xaawo Shire', phone: '+252611223302', relationship: 'Wife' },
    allergies: ['Ibuprofen'],
    notes: 'Right knee meniscal injury under orthopedic therapy.',
    registeredBy: receptionUser._id,
  });

  const patient6 = await Patient.create({
    name: 'Ifrah Salad Warsame',
    age: 6,
    gender: 'Female',
    bloodType: 'O+',
    phone: '+252611223303',
    address: 'Boondheere District, Mogadishu',
    emergencyContact: { name: 'Salad Warsame', phone: '+252611223304', relationship: 'Father' },
    allergies: [],
    notes: 'Pediatric checkup, seasonal asthma follow-up.',
    registeredBy: receptionUser._id,
  });

  const patient7 = await Patient.create({
    name: 'Maxamed Cali Warsame',
    age: 64,
    gender: 'Male',
    bloodType: 'A-',
    phone: '+252611223305',
    address: 'Hawl-Wadaag District, Mogadishu',
    emergencyContact: { name: 'Bashiir Maxamed', phone: '+252611223306', relationship: 'Son' },
    allergies: [],
    notes: 'Type 2 Diabetes and nephrology consultation.',
    registeredBy: receptionUser._id,
  });

  const patient8 = await Patient.create({
    name: 'Naciimo Axmed Cumar',
    age: 23,
    gender: 'Female',
    bloodType: 'O-',
    phone: '+252611223307',
    address: 'Dayniile District, Mogadishu',
    emergencyContact: { name: 'Axmed Cumar', phone: '+252611223308', relationship: 'Father' },
    allergies: ['Dust mites'],
    notes: 'Dermatitis flare-up and allergy testing.',
    registeredBy: receptionUser._id,
  });

  console.log('🧑‍🤝‍🧑 8 Patients created with realistic medical history and emergency contacts');

  // ==========================================
  // 4. APPOINTMENTS (Spread across all 9 doctors)
  // ==========================================
  
  // Doctor 1: Cardiology
  const appt1_past = await Appointment.create({
    patient: patient1._id,
    doctor: doctor1._id,
    date: daysFromNow(-8),
    time: '10:00',
    reason: 'Exertional chest tightness & ECG screening',
    status: 'Completed',
    bookedBy: receptionUser._id,
    notes: 'Patient responded well to initial lifestyle adjustments.',
  });

  const appt1_today = await Appointment.create({
    patient: patient3._id,
    doctor: doctor1._id,
    date: daysFromNow(0),
    time: '11:30',
    reason: 'Cardiovascular risk evaluation and blood pressure check',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  const appt1_future = await Appointment.create({
    patient: patient1._id,
    doctor: doctor1._id,
    date: daysFromNow(5),
    time: '14:00',
    reason: 'Routine 4-week cardiology follow-up',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Doctor 2: Pediatrics
  const appt2_past = await Appointment.create({
    patient: patient6._id,
    doctor: doctor2._id,
    date: daysFromNow(-4),
    time: '11:00',
    reason: 'Pediatric bronchitis and seasonal wheezing review',
    status: 'Completed',
    bookedBy: receptionUser._id,
  });

  const appt2_today = await Appointment.create({
    patient: patient6._id,
    doctor: doctor2._id,
    date: daysFromNow(0),
    time: '15:00',
    reason: 'Developmental growth checkup and vitamin assessment',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Doctor 3: Orthopedics
  const appt3_past = await Appointment.create({
    patient: patient5._id,
    doctor: doctor3._id,
    date: daysFromNow(-6),
    time: '09:00',
    reason: 'Right knee joint pain after soccer injury',
    status: 'Completed',
    bookedBy: receptionUser._id,
  });

  const appt3_future = await Appointment.create({
    patient: patient5._id,
    doctor: doctor3._id,
    date: daysFromNow(2),
    time: '10:30',
    reason: 'Knee MRI review and physical therapy prescription',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Doctor 4: Gynecology
  const appt4_past = await Appointment.create({
    patient: patient2._id,
    doctor: doctor4._id,
    date: daysFromNow(-12),
    time: '11:30',
    reason: 'Second trimester ultrasound and fetal wellbeing',
    status: 'Completed',
    bookedBy: receptionUser._id,
  });

  const appt4_today = await Appointment.create({
    patient: patient2._id,
    doctor: doctor4._id,
    date: daysFromNow(0),
    time: '13:00',
    reason: 'Routine prenatal vitals & nutrition guidance',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Doctor 5: General Medicine
  const appt5_past = await Appointment.create({
    patient: patient3._id,
    doctor: doctor5._id,
    date: daysFromNow(-10),
    time: '09:30',
    reason: 'Essential hypertension routine review',
    status: 'Completed',
    bookedBy: receptionUser._id,
  });

  const appt5_future = await Appointment.create({
    patient: patient7._id,
    doctor: doctor5._id,
    date: daysFromNow(3),
    time: '11:00',
    reason: 'Annual comprehensive executive physical exam',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Doctor 6: Neurology
  const appt6_past = await Appointment.create({
    patient: patient4._id,
    doctor: doctor6._id,
    date: daysFromNow(-7),
    time: '14:30',
    reason: 'Severe unilateral throbbing migraine with aura',
    status: 'Completed',
    bookedBy: receptionUser._id,
  });

  const appt6_future = await Appointment.create({
    patient: patient4._id,
    doctor: doctor6._id,
    date: daysFromNow(4),
    time: '14:30',
    reason: 'Prophylactic migraine response review',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Doctor 7: Oncology
  const appt7_past = await Appointment.create({
    patient: patient7._id,
    doctor: doctor7._id,
    date: daysFromNow(-15),
    time: '10:30',
    reason: 'Post-surgical follow-up & tumor marker evaluation',
    status: 'Completed',
    bookedBy: receptionUser._id,
  });

  const appt7_future = await Appointment.create({
    patient: patient7._id,
    doctor: doctor7._id,
    date: daysFromNow(6),
    time: '11:00',
    reason: 'Quarterly oncology imaging surveillance',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Doctor 8: Dermatology
  const appt8_past = await Appointment.create({
    patient: patient8._id,
    doctor: doctor8._id,
    date: daysFromNow(-5),
    time: '11:00',
    reason: 'Pruritic erythematous skin rash on both forearms',
    status: 'Completed',
    bookedBy: receptionUser._id,
  });

  const appt8_today = await Appointment.create({
    patient: patient8._id,
    doctor: doctor8._id,
    date: daysFromNow(0),
    time: '14:00',
    reason: 'Topical therapy response evaluation',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Doctor 9: Urology
  const appt9_past = await Appointment.create({
    patient: patient7._id,
    doctor: doctor9._id,
    date: daysFromNow(-9),
    time: '10:00',
    reason: 'Flank pain and suspected nephrolithiasis',
    status: 'Completed',
    bookedBy: receptionUser._id,
  });

  const appt9_future = await Appointment.create({
    patient: patient7._id,
    doctor: doctor9._id,
    date: daysFromNow(4),
    time: '11:30',
    reason: 'Renal ultrasound follow-up review',
    status: 'Scheduled',
    bookedBy: receptionUser._id,
  });

  // Cancelled appointment example for statistics
  await Appointment.create({
    patient: patient2._id,
    doctor: doctor5._id,
    date: daysFromNow(-2),
    time: '13:00',
    reason: 'General consultation',
    status: 'Cancelled',
    bookedBy: receptionUser._id,
    notes: 'Patient requested cancellation due to travel schedule.',
  });

  console.log('📅 19 Appointments created spanning all 9 doctors (Today, Past, Upcoming, Cancelled)');

  // ==========================================
  // 5. MEDICAL RECORDS & PRESCRIPTIONS
  // ==========================================
  await Record.create({
    patient: patient1._id,
    doctor: doctor1._id,
    appointment: appt1_past._id,
    diagnosis: 'Stable Angina Pectoris (Grade 1), Hyperlipidemia',
    prescription: [
      { medication: 'Aspirin', dosage: '75mg once daily with breakfast', duration: '60 days' },
      { medication: 'Atorvastatin', dosage: '20mg at bedtime', duration: '60 days' },
    ],
    notes: 'Normal sinus rhythm on ECG. Fasting lipid panel requested. Patient educated on low-saturated fat diet and 30 mins moderate daily walking.',
    followUpDate: daysFromNow(20),
    vitalSigns: {
      bloodPressure: '128/82 mmHg',
      heartRate: '74 bpm',
      temperature: '36.7 °C',
      weight: '81 kg',
    },
  });

  await Record.create({
    patient: patient6._id,
    doctor: doctor2._id,
    appointment: appt2_past._id,
    diagnosis: 'Mild Pediatric Asthmatic Bronchitis',
    prescription: [
      { medication: 'Salbutamol Inhaler', dosage: '2 puffs via spacer as needed for wheeze', duration: '30 days' },
      { medication: 'Paracetamol 250mg/5ml Syrup', dosage: '7.5ml every 6 hours if fever > 38°C', duration: '5 days' },
    ],
    notes: 'Bilateral mild expiratory wheeze. Chest clear after salbutamol nebulization. Advised avoiding cold air exposure and dust triggers.',
    followUpDate: daysFromNow(14),
    vitalSigns: {
      bloodPressure: '98/64 mmHg',
      heartRate: '98 bpm',
      temperature: '37.8 °C',
      weight: '21 kg',
    },
  });

  await Record.create({
    patient: patient5._id,
    doctor: doctor3._id,
    appointment: appt3_past._id,
    diagnosis: 'Right Knee Medial Meniscus Grade 1 Sprain',
    prescription: [
      { medication: 'Ibuprofen 400mg', dosage: '1 tablet twice daily after meals', duration: '10 days' },
      { medication: 'Diclofenac 1% Gel', dosage: 'Apply topically over right knee 3 times daily', duration: '14 days' },
    ],
    notes: 'Mild joint effusion, no ligamentous laxity on Lachman and drawer test. Prescribed knee compression brace and R.I.C.E protocol.',
    followUpDate: daysFromNow(14),
    vitalSigns: {
      bloodPressure: '122/78 mmHg',
      heartRate: '72 bpm',
      temperature: '36.6 °C',
      weight: '84 kg',
    },
  });

  await Record.create({
    patient: patient2._id,
    doctor: doctor4._id,
    appointment: appt4_past._id,
    diagnosis: 'Normal Intrauterine Pregnancy (22 Weeks Gestation)',
    prescription: [
      { medication: 'Ferrous Fumarate + Folic Acid', dosage: '1 tablet daily with citrus juice', duration: '90 days' },
      { medication: 'Calcium Carbonate 500mg', dosage: '1 tablet daily after lunch', duration: '90 days' },
    ],
    notes: 'Fetal anatomy survey unremarkable. Fundal height matches gestational age. Fetal heart rate 142 bpm. Patient in good spirits.',
    followUpDate: daysFromNow(28),
    vitalSigns: {
      bloodPressure: '114/72 mmHg',
      heartRate: '78 bpm',
      temperature: '36.8 °C',
      weight: '66 kg',
    },
  });

  await Record.create({
    patient: patient3._id,
    doctor: doctor5._id,
    appointment: appt5_past._id,
    diagnosis: 'Essential Stage 1 Hypertension (Controlled)',
    prescription: [
      { medication: 'Amlodipine 5mg', dosage: '1 tablet once daily every morning', duration: '90 days' },
    ],
    notes: 'Blood pressure improved compared to last month. Patient strictly adhering to reduced sodium intake. Home blood pressure log reviewed.',
    followUpDate: daysFromNow(30),
    vitalSigns: {
      bloodPressure: '136/86 mmHg',
      heartRate: '80 bpm',
      temperature: '36.5 °C',
      weight: '88 kg',
    },
  });

  await Record.create({
    patient: patient4._id,
    doctor: doctor6._id,
    appointment: appt6_past._id,
    diagnosis: 'Episodic Migraine with Visual Aura',
    prescription: [
      { medication: 'Sumatriptan 50mg', dosage: '1 tablet at onset of headache attack', duration: 'As needed' },
      { medication: 'Propranolol 40mg', dosage: '1 tablet daily for prophylaxis', duration: '60 days' },
    ],
    notes: 'No focal neurological deficits detected on cranial nerve examination. Headache diary initiated to track dietary and sleep triggers.',
    followUpDate: daysFromNow(21),
    vitalSigns: {
      bloodPressure: '118/76 mmHg',
      heartRate: '68 bpm',
      temperature: '36.6 °C',
      weight: '62 kg',
    },
  });

  await Record.create({
    patient: patient8._id,
    doctor: doctor8._id,
    appointment: appt8_past._id,
    diagnosis: 'Subacute Atopic Dermatitis (Eczematous flare)',
    prescription: [
      { medication: 'Hydrocortisone 1% Cream', dosage: 'Apply thin layer twice daily to affected area', duration: '7 days' },
      { medication: 'Cetirizine 10mg', dosage: '1 tablet nightly for pruritus relief', duration: '14 days' },
    ],
    notes: 'Erythematous plaques with lichenification over flexor forearms. Emollient barrier creams demonstrated.',
    followUpDate: daysFromNow(14),
    vitalSigns: {
      bloodPressure: '112/70 mmHg',
      heartRate: '75 bpm',
      temperature: '36.7 °C',
      weight: '55 kg',
    },
  });

  await Record.create({
    patient: patient7._id,
    doctor: doctor9._id,
    appointment: appt9_past._id,
    diagnosis: 'Right Renal Calculus (4mm lower pole, non-obstructive)',
    prescription: [
      { medication: 'Tamsulosin 0.4mg', dosage: '1 capsule daily after dinner', duration: '14 days' },
      { medication: 'Paracetamol 1000mg', dosage: '1 tab every 8h for flank ache', duration: '5 days' },
    ],
    notes: 'Spontaneous stone passage likely. Patient instructed on 3 liters daily oral hydration and urine straining protocol.',
    followUpDate: daysFromNow(10),
    vitalSigns: {
      bloodPressure: '130/84 mmHg',
      heartRate: '76 bpm',
      temperature: '36.8 °C',
      weight: '79 kg',
    },
  });

  console.log('📋 8 Detailed Medical Records created with realistic diagnoses, vitals, & prescriptions');

  // ==========================================
  // 6. INVOICES & BILLING
  // ==========================================
  await Invoice.create({
    patient: patient1._id,
    doctor: doctor1._id,
    appointment: appt1_past._id,
    services: [
      { name: 'Specialist Cardiology Consultation', amount: 40 },
      { name: '12-Lead Electrocardiogram (ECG)', amount: 25 },
      { name: 'Comprehensive Lipid Profile', amount: 20 },
    ],
    totalAmount: 85,
    paidAmount: 85,
    paymentStatus: 'Paid',
    paymentMethod: 'EVC Plus',
    paidAt: daysFromNow(-8),
    notes: 'Paid via EVC Plus transaction ID: 98112348.',
  });

  await Invoice.create({
    patient: patient6._id,
    doctor: doctor2._id,
    appointment: appt2_past._id,
    services: [
      { name: 'Pediatric Consultation', amount: 35 },
      { name: 'Oxygen Saturation & Nebulization Session', amount: 15 },
    ],
    totalAmount: 50,
    paidAmount: 50,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash',
    paidAt: daysFromNow(-4),
    notes: 'Paid cash at reception counter.',
  });

  await Invoice.create({
    patient: patient5._id,
    doctor: doctor3._id,
    appointment: appt3_past._id,
    services: [
      { name: 'Orthopedic Consultation', amount: 45 },
      { name: 'Right Knee Digital X-Ray (2 Views)', amount: 30 },
      { name: 'Elastic Joint Stabilizer Brace', amount: 15 },
    ],
    totalAmount: 90,
    paidAmount: 50,
    paymentStatus: 'Partial',
    paymentMethod: 'Card',
    paidAt: daysFromNow(-6),
    notes: 'Initial card deposit of $50, remaining balance $40 due on follow-up.',
  });

  await Invoice.create({
    patient: patient2._id,
    doctor: doctor4._id,
    appointment: appt4_past._id,
    services: [
      { name: 'Obstetric Consultation', amount: 35 },
      { name: 'Obstetric 2D Ultrasound Scan', amount: 40 },
    ],
    totalAmount: 75,
    paidAmount: 75,
    paymentStatus: 'Paid',
    paymentMethod: 'Insurance',
    paidAt: daysFromNow(-12),
    notes: 'Billed to Takaful Health Insurance Policy #TKF-88219.',
  });

  await Invoice.create({
    patient: patient3._id,
    doctor: doctor5._id,
    appointment: appt5_past._id,
    services: [
      { name: 'General Medicine Consultation', amount: 25 },
      { name: 'Basic Metabolic Panel & Fasting Glucose', amount: 20 },
    ],
    totalAmount: 45,
    paidAmount: 45,
    paymentStatus: 'Paid',
    paymentMethod: 'EVC Plus',
    paidAt: daysFromNow(-10),
    notes: 'Paid through automated EVC payment gateway.',
  });

  await Invoice.create({
    patient: patient4._id,
    doctor: doctor6._id,
    appointment: appt6_past._id,
    services: [
      { name: 'Neurology Consultation & Neurological Exam', amount: 50 },
      { name: 'Visual Field Screening', amount: 25 },
    ],
    totalAmount: 75,
    paidAmount: 75,
    paymentStatus: 'Paid',
    paymentMethod: 'Card',
    paidAt: daysFromNow(-7),
  });

  await Invoice.create({
    patient: patient8._id,
    doctor: doctor8._id,
    appointment: appt8_past._id,
    services: [
      { name: 'Dermatology Consultation', amount: 40 },
      { name: 'Skin Dermoscopy Examination', amount: 20 },
    ],
    totalAmount: 60,
    paidAmount: 60,
    paymentStatus: 'Paid',
    paymentMethod: 'EVC Plus',
    paidAt: daysFromNow(-5),
  });

  await Invoice.create({
    patient: patient7._id,
    doctor: doctor9._id,
    appointment: appt9_past._id,
    services: [
      { name: 'Urology Consultation', amount: 45 },
      { name: 'Renal & Bladder Ultrasound', amount: 35 },
      { name: 'Urinalysis Laboratory Panel', amount: 15 },
    ],
    totalAmount: 95,
    paidAmount: 95,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash',
    paidAt: daysFromNow(-9),
  });

  // Today and upcoming invoices (Unpaid / Open)
  await Invoice.create({
    patient: patient3._id,
    doctor: doctor1._id,
    appointment: appt1_today._id,
    services: [
      { name: 'Cardiology Follow-Up Consultation', amount: 40 },
    ],
    totalAmount: 40,
    paidAmount: 0,
    paymentStatus: 'Unpaid',
    paymentMethod: '',
    notes: 'Appointment scheduled today, pending payment.',
  });

  await Invoice.create({
    patient: patient2._id,
    doctor: doctor4._id,
    appointment: appt4_today._id,
    services: [
      { name: 'Prenatal Routine Consultation', amount: 35 },
    ],
    totalAmount: 35,
    paidAmount: 0,
    paymentStatus: 'Unpaid',
    paymentMethod: '',
  });

  await Invoice.create({
    patient: patient7._id,
    doctor: doctor7._id,
    appointment: appt7_past._id,
    services: [
      { name: 'Oncology Specialist Review', amount: 60 },
      { name: 'Serum Tumor Marker Panel (CEA/CA-19)', amount: 65 },
    ],
    totalAmount: 125,
    paidAmount: 60,
    paymentStatus: 'Partial',
    paymentMethod: 'Card',
    paidAt: daysFromNow(-15),
    notes: 'Partial payment made by debit card, $65 outstanding.',
  });

  console.log('🧾 11 Invoices created with mixed payments (EVC Plus, Cash, Card, Insurance) & statuses');

  // ==========================================
  // 7. APPOINTMENT REQUESTS (Public requests)
  // ==========================================
  await AppointmentRequest.create([
    {
      name: 'Nasteexo Warsame Xirsi',
      phone: '+252618991122',
      email: 'nasteexo@example.com',
      department: 'Cardiology',
      date: daysFromNow(2),
      time: '10:30',
      message: 'Experiencing intermittent palpitations after physical exertion.',
      status: 'Pending',
      doctor: doctor1._id,
    },
    {
      name: 'Xasan Cabdi Shire',
      phone: '+252618991123',
      email: 'xasan.c@example.com',
      department: 'General Medicine',
      date: daysFromNow(3),
      time: '09:00',
      message: 'Persistent dry cough and mild evening fever for 5 days.',
      status: 'Pending',
      doctor: doctor5._id,
    },
    {
      name: 'Sahra Maxamuud Geelle',
      phone: '+252618991124',
      email: 'sahra.m@example.com',
      department: 'Gynecology',
      date: daysFromNow(4),
      time: '11:00',
      message: 'Booking for first trimester pregnancy confirmation and ultrasound.',
      status: 'Pending',
      doctor: doctor4._id,
    },
    {
      name: 'Farxaan Cismaan Nuur',
      phone: '+252618991125',
      email: 'farxaan.o@example.com',
      department: 'Orthopedics',
      date: daysFromNow(1),
      time: '14:00',
      message: 'Sprained left ankle during basketball yesterday, painful to bear weight.',
      status: 'Confirmed',
      doctor: doctor3._id,
    },
    {
      name: 'Khadra Maxamed Cali',
      phone: '+252618991126',
      email: 'khadra@example.com',
      department: 'Dermatology',
      date: daysFromNow(3),
      time: '11:30',
      message: 'Severe allergic skin rash after taking new cosmetics.',
      status: 'Pending',
      doctor: doctor8._id,
    },
    {
      name: 'Yuusuf Axmed Barre',
      phone: '+252618991127',
      department: 'Neurology',
      date: daysFromNow(5),
      time: '15:00',
      message: 'Recurring tension headaches causing sleep disturbance.',
      status: 'Cancelled',
      doctor: doctor6._id,
    },
  ]);

  console.log('📝 6 Public appointment requests created (Pending, Confirmed, Cancelled)');

  // ==========================================
  // 8. PHARMACY INVENTORY (With Low Stock & Expiring Badges)
  // ==========================================
  await Medicine.create([
    {
      name: 'Amoxicillin 500mg',
      category: 'Tablet',
      stock: 140,
      lowStockThreshold: 30,
      expiryDate: daysFromNow(380),
      price: 0.5,
      manufacturer: 'Cipla Ltd',
      description: 'Broad-spectrum penicillin antibiotic for bacterial respiratory and ear infections.',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Paracetamol 500mg',
      category: 'Tablet',
      stock: 12, // LOW STOCK ALERT
      lowStockThreshold: 25,
      expiryDate: daysFromNow(450),
      price: 0.2,
      manufacturer: 'GSK Healthcare',
      description: 'Standard antipyretic and mild analgesic for fever and pain relief.',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Amlodipine 5mg',
      category: 'Tablet',
      stock: 65,
      lowStockThreshold: 20,
      expiryDate: daysFromNow(520),
      price: 0.75,
      manufacturer: 'Pfizer',
      description: 'Calcium channel blocker for essential hypertension and coronary artery prophylaxis.',
    },
    {
      name: 'Aspirin 75mg Gastro-Resistant',
      category: 'Tablet',
      stock: 8, // LOW STOCK ALERT
      lowStockThreshold: 20,
      expiryDate: daysFromNow(320),
      price: 0.35,
      manufacturer: 'Bayer AG',
      description: 'Antiplatelet agent for cardiovascular secondary prophylaxis.',
    },
    {
      name: 'Salbutamol 100mcg Inhaler',
      category: 'Other',
      stock: 5, // LOW STOCK ALERT
      lowStockThreshold: 15,
      expiryDate: daysFromNow(260),
      price: 4.5,
      manufacturer: 'Cipla Respiratory',
      description: 'Fast-acting bronchodilator inhaler for acute asthma and bronchospasm.',
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Metformin 850mg',
      category: 'Tablet',
      stock: 90,
      lowStockThreshold: 25,
      expiryDate: daysFromNow(400),
      price: 0.45,
      manufacturer: 'Merck Healthcare',
      description: 'First-line biguanide oral hypoglycemic agent for Type 2 diabetes management.',
    },
    {
      name: 'Atorvastatin 20mg',
      category: 'Tablet',
      stock: 55,
      lowStockThreshold: 15,
      expiryDate: daysFromNow(360),
      price: 0.85,
      manufacturer: 'Viatris Inc',
      description: 'HMG-CoA reductase inhibitor for hypercholesterolemia and lipid stabilization.',
    },
    {
      name: 'Ibuprofen 400mg',
      category: 'Tablet',
      stock: 45,
      lowStockThreshold: 20,
      expiryDate: daysFromNow(220),
      price: 0.4,
      manufacturer: 'Abbott',
      description: 'Non-steroidal anti-inflammatory drug (NSAID) for musculoskeletal pain.',
    },
    {
      name: 'Oral Rehydration Salts (ORS)',
      category: 'Other',
      stock: 250,
      lowStockThreshold: 50,
      expiryDate: daysFromNow(600),
      price: 0.3,
      manufacturer: 'WHO Certified Labs',
      description: 'Electrolyte rehydration solution for dehydration prevention in diarrheal illness.',
    },
    {
      name: 'Hydrocortisone 1% Cream 15g',
      category: 'Ointment',
      stock: 35,
      lowStockThreshold: 10,
      expiryDate: daysFromNow(180),
      price: 2.2,
      manufacturer: 'Galderma',
      description: 'Mild topical corticosteroid for dermatitis, eczema, and skin pruritus.',
    },
    {
      name: 'Vitamin C 500mg Chewable',
      category: 'Tablet',
      stock: 40,
      lowStockThreshold: 15,
      expiryDate: daysFromNow(18), // EXPIRING SOON ALERT (< 30 days)
      price: 0.25,
      manufacturer: 'Nature Health',
      description: 'Antioxidant immune booster supplement.',
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Ceftriaxone 1g Injection Vial',
      category: 'Injection',
      stock: 28,
      lowStockThreshold: 10,
      expiryDate: daysFromNow(300),
      price: 3.5,
      manufacturer: 'Roche Diagnostics',
      description: 'Third-generation cephalosporin injectable antibiotic for acute infections.',
    },
    {
      name: 'Diclofenac Sodium 50mg',
      category: 'Tablet',
      stock: 70,
      lowStockThreshold: 20,
      expiryDate: daysFromNow(340),
      price: 0.35,
      manufacturer: 'Novartis',
      description: 'Anti-inflammatory analgesic for joint arthritis and post-traumatic injury.',
    },
    {
      name: 'Multivitamin Complex Syrup 150ml',
      category: 'Syrup',
      stock: 18,
      lowStockThreshold: 10,
      expiryDate: daysFromNow(25), // EXPIRING SOON ALERT (< 30 days)
      price: 3.0,
      manufacturer: 'Sanofi Healthcare',
      description: 'Pediatric pediatric multivitamin and mineral dietary supplement.',
    },
  ]);

  console.log('💊 14 Pharmacy medicines created with low-stock & expiring badges');

  // ==========================================
  // 9. HOSPITAL CLINIC SETTINGS
  // ==========================================
  await Settings.create({
    hospitalName: 'SmartClinic Hospital',
    address: 'Airport Road, Wadajir District, Mogadishu, Somalia',
    phone: '+252 61 555 0000',
    email: 'info@smartclinic.so',
    website: 'https://smartclinic.so',
    workingHours: { start: '08:00', end: '20:00' },
    workingDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    currency: 'USD',
    taxRate: 0,
  });

  console.log('⚙️  Hospital Settings created');

  console.log('\n======================================================');
  console.log('🎉 SMARTCLINIC SEED COMPLETE! READY FOR PORTFOLIO DEMO');
  console.log('======================================================');
  console.log('\n🔑 Quick Login Credentials (All passwords: "password123"):');
  console.log('------------------------------------------------------');
  console.log('• Admin:            admin@gmail.com');
  console.log('• Receptionist:     reception@gmail.com');
  console.log('• Cardiologist:     dr.yusuf@gmail.com');
  console.log('• Pediatrician:     dr.faduma@gmail.com');
  console.log('• Orthopedic:       dr.abdirahman@gmail.com');
  console.log('• Gynecologist:     dr.deeqa@gmail.com');
  console.log('• General Medicine: dr.liban@gmail.com');
  console.log('• Neurologist:      dr.sarah@gmail.com');
  console.log('• Oncologist:       dr.rajesh@gmail.com');
  console.log('• Dermatologist:    dr.elena@gmail.com');
  console.log('• Urologist:        dr.michael@gmail.com');
  console.log('• Patient Portal:   patient@gmail.com or sahra@gmail.com');
  console.log('======================================================\n');
};

const run = async () => {
  await connectDB();
  try {
    if (process.argv.includes('-d') || process.argv.includes('--destroy')) {
      await destroyData();
    } else {
      await destroyData();
      await seedData();
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed with error:', error);
    process.exit(1);
  }
};

run();
