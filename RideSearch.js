// Optional: Add route line styling via CSS after page load
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .route-line {
            height: 30px;
            width: 2px;
            background-color: #ddd;
            margin: 5px auto;
        }
    `;
    document.head.appendChild(style);
});

// Radio buttons logic
document.addEventListener('DOMContentLoaded', function () {
    const dailyRadio = document.getElementById('dailyRide');
    const monthlyRadio = document.getElementById('monthlyRide');
    const dateInput = document.getElementById('date');
    const monthSelect = document.getElementById('month');

    dailyRadio.addEventListener('change', () => {
        if (dailyRadio.checked) {
            dateInput.disabled = false;
            monthSelect.disabled = true;
            monthSelect.value = '';
        }
    });

    monthlyRadio.addEventListener('change', () => {
        if (monthlyRadio.checked) {
            monthSelect.disabled = false;
            dateInput.disabled = true;
            dateInput.value = '';
        }
    });
});

const ridesData = [
    {
        id: 1,
        startingPoint: "Gate 1",
        endingPoint: "SEECS",
        stops: ["RIMMS", "Central Library"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Wed", "Fri"],
        tripType: "One-way",
        departureTime: "08:30",
        returnTime: "",
        price: 100,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Suzuki Cultus",
        color: "Silver",
        maxPassengers: 3,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Picks up from parking near Gate 1",
        contactInfo: {
            phone: "03001234567",
            alternatePhone: "",
            email: "driver1@nust.edu.pk",
            preferredContact: "Phone Call"
        },
        seatsAvailable: 2,
        riderName: "Ahmed Khan",
        riderImage: "profile.jpg",
        rating: 4.8
    },
    {
        id: 2,
        startingPoint: "SMME",
        endingPoint: "SADA",
        stops: ["Liaquat Hostel"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "Round-trip",
        departureTime: "09:15",
        returnTime: "17:30",
        price: 120,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Toyota Corolla",
        color: "White",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Can wait ±10 minutes",
        contactInfo: {
            phone: "03111234567",
            alternatePhone: "03211234567",
            email: "driver2@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 3,
        riderName: "Faisal Malik",
        riderImage: "profile.jpg",
        rating: 4.6
    },
    {
        id: 3,
        startingPoint: "Razi Hostel",
        endingPoint: "NBS",
        stops: [],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        tripType: "One-way",
        departureTime: "07:45",
        returnTime: "",
        price: 80,
        priceType: "Per seat",
        vehicleType: "Bike",
        make: "Honda CG 125",
        color: "Black",
        maxPassengers: 1,
        preferences: {
            helmetProvided: true,
            rainGearAvailable: false
        },
        additionalInfo: "Helmet available for passenger",
        contactInfo: {
            phone: "03331234567",
            alternatePhone: "",
            email: "driver3@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 1,
        riderName: "Usman Tariq",
        riderImage: "profile.jpg",
        rating: 4.9
    },
    {
        id: 4,
        startingPoint: "RIMMS",
        endingPoint: "Centaurus Mall",
        stops: ["G-9 Markaz", "Blue Area"],
        frequency: "Monthly",
        daysAvailable: ["Sat"],
        tripType: "Round-trip",
        departureTime: "10:00",
        returnTime: "18:00",
        price: 800,
        priceType: "Monthly",
        vehicleType: "Car",
        make: "Suzuki WagonR",
        color: "Red",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Shopping trip every first Saturday",
        contactInfo: {
            phone: "03451234567",
            alternatePhone: "",
            email: "driver4@nust.edu.pk",
            preferredContact: "Email"
        },
        seatsAvailable: 3,
        riderName: "Hassan Aslam",
        riderImage: "profile.jpg",
        rating: 4.7
    },
    {
        id: 5,
        startingPoint: "SEECS",
        endingPoint: "NUST Incubation Center",
        stops: ["C1"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Wed", "Fri"],
        tripType: "One-way",
        departureTime: "14:30",
        returnTime: "",
        price: 90,
        priceType: "Per seat",
        vehicleType: "Bike",
        make: "Yamaha YBR",
        color: "Blue",
        maxPassengers: 1,
        preferences: {
            helmetProvided: true,
            rainGearAvailable: true
        },
        additionalInfo: "Quick ride post-labs",
        contactInfo: {
            phone: "03011234567",
            alternatePhone: "",
            email: "driver5@nust.edu.pk",
            preferredContact: "Phone Call"
        },
        seatsAvailable: 1,
        riderName: "Bilal Zafar",
        riderImage: "profile.jpg",
        rating: 4.5
    },
    {
        id: 6,
        startingPoint: "Ghazali Hostel",
        endingPoint: "SCEE",
        stops: ["TIC", "Central Library"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "Round-trip",
        departureTime: "08:00",
        returnTime: "16:30",
        price: 100,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Kia Picanto",
        color: "White",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: false
        },
        additionalInfo: "Quiet ride, bring your books!",
        contactInfo: {
            phone: "03121234567",
            alternatePhone: "03431234567",
            email: "driver6@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 2,
        riderName: "Mohsin Iqbal",
        riderImage: "profile.jpg",
        rating: 4.9
    },
    {
        id: 7,
        startingPoint: "Rumi Hostel",
        endingPoint: "RIMMS",
        stops: ["Admin Block", "Central Library"],
        frequency: "Monthly",
        daysAvailable: ["Mon", "Wed", "Fri"],
        tripType: "One-way",
        departureTime: "09:30",
        returnTime: "",
        price: 900,
        priceType: "Monthly",
        vehicleType: "Car",
        make: "Honda BR-V",
        color: "Gray",
        maxPassengers: 6,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Group ride for staff and seniors",
        contactInfo: {
            phone: "03231234567",
            alternatePhone: "",
            email: "driver7@nust.edu.pk",
            preferredContact: "Email"
        },
        seatsAvailable: 4,
        riderName: "Ali Raza",
        riderImage: "profile.jpg",
        rating: 4.7
    },
    {
        id: 8,
        startingPoint: "Beruni Hostel",
        endingPoint: "SMME",
        stops: ["Sports Complex"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "One-way",
        departureTime: "08:45",
        returnTime: "",
        price: 70,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Honda Civic",
        color: "Black",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Leaves after chai stop",
        contactInfo: {
            phone: "03311234567",
            alternatePhone: "",
            email: "driver8@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 3,
        riderName: "Zain Yousaf",
        riderImage: "profile.jpg",
        rating: 4.8
    },
    {
        id: 9,
        startingPoint: "C2",
        endingPoint: "NICE Ground",
        stops: ["Sports Complex"],
        frequency: "Weekly",
        daysAvailable: ["Sat", "Sun"],
        tripType: "Round-trip",
        departureTime: "15:00",
        returnTime: "19:00",
        price: 150,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Toyota Vitz",
        color: "Blue",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: true,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Weekend football practice ride",
        contactInfo: {
            phone: "03081234567",
            alternatePhone: "",
            email: "driver9@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 3,
        riderName: "Saad Ahmed",
        riderImage: "profile.jpg",
        rating: 4.5
    },
    {
        id: 10,
        startingPoint: "Johar Hostel",
        endingPoint: "F-10 Markaz",
        stops: ["Gate 2", "Metro Station"],
        frequency: "Weekly",
        daysAvailable: ["Fri"],
        tripType: "Round-trip",
        departureTime: "14:00",
        returnTime: "20:00",
        price: 200,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Suzuki Swift",
        color: "Dark Blue",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: true,
            music: true
        },
        additionalInfo: "Friday evening hangout",
        contactInfo: {
            phone: "03341234567",
            alternatePhone: "",
            email: "driver10@nust.edu.pk",
            preferredContact: "Phone Call"
        },
        seatsAvailable: 3,
        riderName: "Kamran Shah",
        riderImage: "profile.jpg",
        rating: 4.7
    },
    {
        id: 11,
        startingPoint: "SEECS",
        endingPoint: "Attar Hostel",
        stops: ["Central Library", "Sports Complex"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu"],
        tripType: "One-way",
        departureTime: "17:00",
        returnTime: "",
        price: 70,
        priceType: "Per seat",
        vehicleType: "Bike",
        make: "Honda CD 70",
        color: "Red",
        maxPassengers: 1,
        preferences: {
            helmetProvided: true,
            rainGearAvailable: false
        },
        additionalInfo: "After evening classes",
        contactInfo: {
            phone: "03471234567",
            alternatePhone: "",
            email: "driver11@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 1,
        riderName: "Fawad Khan",
        riderImage: "profile.jpg",
        rating: 4.3
    },
    {
        id: 12,
        startingPoint: "Gate 4",
        endingPoint: "SCME",
        stops: ["C4", "NICE Ground"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "One-way",
        departureTime: "08:15",
        returnTime: "",
        price: 90,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Toyota Aqua",
        color: "Green",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Morning classes ride",
        contactInfo: {
            phone: "03351234567",
            alternatePhone: "03041234567",
            email: "driver12@nust.edu.pk",
            preferredContact: "Email"
        },
        seatsAvailable: 3,
        riderName: "Umer Farooq",
        riderImage: "profile.jpg",
        rating: 4.6
    },
    {
        id: 13,
        startingPoint: "Hajveri Hostel",
        endingPoint: "SCME Ground",
        stops: ["NICE Ground"],
        frequency: "Weekly",
        daysAvailable: ["Wed", "Sun"],
        tripType: "Round-trip",
        departureTime: "16:00",
        returnTime: "19:00",
        price: 80,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Honda City",
        color: "Silver",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Cricket practice ride",
        contactInfo: {
            phone: "03321234567",
            alternatePhone: "",
            email: "driver13@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 3,
        riderName: "Imran Ali",
        riderImage: "profile.jpg",
        rating: 4.9
    },
    {
        id: 14,
        startingPoint: "SADA",
        endingPoint: "Giga Mall",
        stops: ["Gate 10", "DHA Phase 2"],
        frequency: "Weekly",
        daysAvailable: ["Sat"],
        tripType: "Round-trip",
        departureTime: "11:00",
        returnTime: "17:00",
        price: 250,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Honda Civic",
        color: "White",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Weekend shopping and lunch",
        contactInfo: {
            phone: "03331234568",
            alternatePhone: "",
            email: "driver14@nust.edu.pk",
            preferredContact: "Phone Call"
        },
        seatsAvailable: 2,
        riderName: "Shahid Mahmood",
        riderImage: "profile.jpg",
        rating: 4.8
    },
    {
        id: 15,
        startingPoint: "Zakariya Hostel",
        endingPoint: "SEECS",
        stops: ["C3"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "One-way",
        departureTime: "07:30",
        returnTime: "",
        price: 60,
        priceType: "Per seat",
        vehicleType: "Bike",
        make: "Yamaha YBR",
        color: "Black",
        maxPassengers: 1,
        preferences: {
            helmetProvided: true,
            rainGearAvailable: true
        },
        additionalInfo: "Early morning classes",
        contactInfo: {
            phone: "03011234568",
            alternatePhone: "",
            email: "driver15@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 1,
        riderName: "Asad Qureshi",
        riderImage: "profile.jpg",
        rating: 4.4
    },
    {
        id: 16,
        startingPoint: "Liaquat Hostel",
        endingPoint: "NBS",
        stops: ["Central Library"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "Round-trip",
        departureTime: "08:00",
        returnTime: "16:00",
        price: 120,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Suzuki Alto",
        color: "Gray",
        maxPassengers: 3,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: false
        },
        additionalInfo: "Quiet ride for study focus",
        contactInfo: {
            phone: "03121234568",
            alternatePhone: "",
            email: "driver16@nust.edu.pk",
            preferredContact: "Email"
        },
        seatsAvailable: 2,
        riderName: "Naveed Ahmed",
        riderImage: "profile.jpg",
        rating: 4.7
    },
    {
        id: 17,
        startingPoint: "SCEE",
        endingPoint: "F-8 Markaz",
        stops: ["Gate 1", "Kachnar Park"],
        frequency: "Weekly",
        daysAvailable: ["Fri"],
        tripType: "Round-trip",
        departureTime: "13:30",
        returnTime: "18:30",
        price: 180,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Toyota Corolla",
        color: "Black",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: true,
            music: true
        },
        additionalInfo: "Friday prayer and lunch",
        contactInfo: {
            phone: "03231234568",
            alternatePhone: "",
            email: "driver17@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 3,
        riderName: "Waqar Hassan",
        riderImage: "profile.jpg",
        rating: 4.5
    },
    {
        id: 18,
        startingPoint: "NICE Ground",
        endingPoint: "Rahmat Hostel",
        stops: [],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        tripType: "One-way",
        departureTime: "19:00",
        returnTime: "",
        price: 50,
        priceType: "Per seat",
        vehicleType: "Bike",
        make: "Honda CG 125",
        color: "Red",
        maxPassengers: 1,
        preferences: {
            helmetProvided: true,
            rainGearAvailable: false
        },
        additionalInfo: "After evening sports practice",
        contactInfo: {
            phone: "03451234568",
            alternatePhone: "",
            email: "driver18@nust.edu.pk",
            preferredContact: "Phone Call"
        },
        seatsAvailable: 1,
        riderName: "Tariq Jameel",
        riderImage: "profile.jpg",
        rating: 4.6
    },
    {
        id: 19,
        startingPoint: "C1",
        endingPoint: "SMME",
        stops: ["Sports Complex"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "One-way",
        departureTime: "09:00",
        returnTime: "",
        price: 80,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Suzuki Cultus",
        color: "Blue",
        maxPassengers: 3,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Morning classes ride",
        contactInfo: {
            phone: "03341234568",
            alternatePhone: "",
            email: "driver19@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 2,
        riderName: "Adnan Sheikh",
        riderImage: "profile.jpg",
        rating: 4.4
    },
    {
        id: 20,
        startingPoint: "Central Library",
        endingPoint: "Jinnah Super Market",
        stops: ["Gate 2"],
        frequency: "Weekly",
        daysAvailable: ["Sat"],
        tripType: "Round-trip",
        departureTime: "12:00",
        returnTime: "18:00",
        price: 200,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Honda Vezel",
        color: "White",
        maxPassengers: 5,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Weekend shopping trip",
        contactInfo: {
            phone: "03311234568",
            alternatePhone: "03131234568",
            email: "driver20@nust.edu.pk",
            preferredContact: "Email"
        },
        seatsAvailable: 3,
        riderName: "Rizwan Malik",
        riderImage: "profile.jpg",
        rating: 4.9
    },
    {
        id: 21,
        startingPoint: "Sports Complex",
        endingPoint: "Rumi Hostel",
        stops: ["Central Library"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Wed", "Fri"],
        tripType: "One-way",
        departureTime: "18:00",
        returnTime: "",
        price: 60,
        priceType: "Per seat",
        vehicleType: "Bike",
        make: "Honda CD 70",
        color: "Black",
        maxPassengers: 1,
        preferences: {
            helmetProvided: true,
            rainGearAvailable: false
        },
        additionalInfo: "After gym session",
        contactInfo: {
            phone: "03351234568",
            alternatePhone: "",
            email: "driver21@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 1,
        riderName: "Hamid Khan",
        riderImage: "profile.jpg",
        rating: 4.3
    },
    {
        id: 22,
        startingPoint: "Gate 10",
        endingPoint: "SCME",
        stops: ["C4"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "One-way",
        departureTime: "08:30",
        returnTime: "",
        price: 90,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Kia Sportage",
        color: "Silver",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Morning classes ride",
        contactInfo: {
            phone: "03321234568",
            alternatePhone: "",
            email: "driver22@nust.edu.pk",
            preferredContact: "Phone Call"
        },
        seatsAvailable: 3,
        riderName: "Majid Ali",
        riderImage: "profile.jpg",
        rating: 4.7
    },
    {
        id: 23,
        startingPoint: "Attar Hostel",
        endingPoint: "SCME Ground",
        stops: ["Sports Complex"],
        frequency: "Weekly",
        daysAvailable: ["Tue", "Thu"],
        tripType: "Round-trip",
        departureTime: "16:30",
        returnTime: "19:30",
        price: 100,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Toyota Vitz",
        color: "Red",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Sports practice ride",
        contactInfo: {
            phone: "03001234568",
            alternatePhone: "",
            email: "driver23@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 3,
        riderName: "Farhan Siddiqui",
        riderImage: "profile.jpg",
        rating: 4.6
    },
    {
        id: 24,
        startingPoint: "RIMMS",
        endingPoint: "Safa Gold Mall",
        stops: ["Gate 1", "F-7 Markaz"],
        frequency: "Weekly",
        daysAvailable: ["Sat"],
        tripType: "Round-trip",
        departureTime: "11:30",
        returnTime: "17:30",
        price: 220,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Honda Civic",
        color: "Gray",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: true
        },
        additionalInfo: "Weekend mall trip",
        contactInfo: {
            phone: "03471234568",
            alternatePhone: "",
            email: "driver24@nust.edu.pk",
            preferredContact: "Email"
        },
        seatsAvailable: 2,
        riderName: "Sajid Hussain",
        riderImage: "profile.jpg",
        rating: 4.8
    },
    {
        id: 25,
        startingPoint: "NBS",
        endingPoint: "Hajveri Hostel",
        stops: ["Central Library"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "One-way",
        departureTime: "16:00",
        returnTime: "",
        price: 70,
        priceType: "Per seat",
        vehicleType: "Bike",
        make: "Yamaha YBR",
        color: "Blue",
        maxPassengers: 1,
        preferences: {
            helmetProvided: true,
            rainGearAvailable: true
        },
        additionalInfo: "After classes ride",
        contactInfo: {
            phone: "03331234569",
            alternatePhone: "",
            email: "driver25@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 1,
        riderName: "Yasir Shah",
        riderImage: "profile.jpg",
        rating: 4.5
    },
    {
        id: 26,
        startingPoint: "Beruni Hostel",
        endingPoint: "SEECS",
        stops: ["C3"],
        frequency: "Daily",
        daysAvailable: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        tripType: "Round-trip",
        departureTime: "08:15",
        returnTime: "17:15",
        price: 110,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Suzuki Swift",
        color: "Black",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: false,
            music: false
        },
        additionalInfo: "Full day classes ride",
        contactInfo: {
            phone: "03121234569",
            alternatePhone: "",
            email: "driver26@nust.edu.pk",
            preferredContact: "Phone Call"
        },
        seatsAvailable: 3,
        riderName: "Kashif Nawaz",
        riderImage: "profile.jpg",
        rating: 4.7
    },
    {
        id: 27,
        startingPoint: "SCME",
        endingPoint: "Blue Area",
        stops: ["Gate 4", "Kachnar Park"],
        frequency: "Weekly",
        daysAvailable: ["Fri"],
        tripType: "Round-trip",
        departureTime: "14:00",
        returnTime: "19:00",
        price: 200,
        priceType: "Per seat",
        vehicleType: "Car",
        make: "Toyota Corolla",
        color: "White",
        maxPassengers: 4,
        preferences: {
            ac: true,
            petsAllowed: false,
            smokingAllowed: true,
            music: true
        },
        additionalInfo: "Friday hangout and dinner",
        contactInfo: {
            phone: "03231234569",
            alternatePhone: "",
            email: "driver27@nust.edu.pk",
            preferredContact: "Whatsapp"
        },
        seatsAvailable: 2,
        riderName: "Zubair Ahmed",
        riderImage: "profile.jpg",
        rating: 4.6
    }
]


// DOM elements
const ridesContainer = document.getElementById('rides-container');
const resultsCount = document.getElementById('results-count');
const noResults = document.getElementById('no-results');
const filterButton = document.getElementById('filterButton');
const resetButton = document.getElementById('resetButton');
const sortOptions = document.querySelectorAll('.sort-option');
const showOnlyAvailable = document.getElementById('showOnlyAvailable');

// Current sort option
let currentSort = 'price-low';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display all rides on page load
    displayRides(ridesData);
    
    // Set up event listeners
    filterButton.addEventListener('click', filterRides);
    resetButton.addEventListener('click', resetFilters);
    showOnlyAvailable.addEventListener('change', filterRides);
    
    // Sort options
    sortOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            currentSort = this.getAttribute('data-sort');
            document.getElementById('sortDropdown').textContent = 'Sort by: ' + this.textContent;
            filterRides();
        });
    });
});

// Function to display rides
function displayRides(rides) {
    // Clear the container first
    ridesContainer.innerHTML = '';
    
    // Update the results count
    resultsCount.textContent = rides.length;
    
    // Show or hide no results message
    if (rides.length === 0) {
        noResults.classList.remove('d-none');
    } else {
        noResults.classList.add('d-none');
    }
    
    // Sort the rides based on current sort option
    sortRides(rides);
    
    // Create ride cards
    rides.forEach(ride => {
        const rideCard = createRideCard(ride);
        ridesContainer.appendChild(rideCard);
    });
}

// Function to create a ride card
function createRideCard(ride) {
    const card = document.createElement('div');
    card.className = 'card mb-4 ride-card-animated fade-in';
    card.setAttribute('data-ride-id', ride.id);
    
    // Create badge for frequency
    const frequencyBadge = ride.frequency === 'Daily' 
        ? '<span class="badge bg-primary me-2">Daily</span>' 
        : '<span class="badge bg-success me-2">Monthly</span>';
    
    // Create badge for vehicle type
    const vehicleBadge = ride.vehicleType === 'Car' 
        ? '<span class="badge bg-info me-2">Car</span>' 
        : '<span class="badge bg-warning text-dark me-2">Bike</span>';
    
    // Format days available
    const daysAvailable = ride.daysAvailable.join(', ');
    
    // Format preferences
    let preferences = [];
    if (ride.vehicleType === 'Car') {
        if (ride.preferences.ac) preferences.push('<i class="fas fa-snowflake text-primary me-1"></i> AC');
        if (ride.preferences.petsAllowed) preferences.push('<i class="fas fa-paw text-primary me-1"></i> Pets Allowed');
        if (ride.preferences.smokingAllowed) preferences.push('<i class="fas fa-smoking text-primary me-1"></i> Smoking Allowed');
        if (ride.preferences.music) preferences.push('<i class="fas fa-music text-primary me-1"></i> Music');
    } else {
        if (ride.preferences.helmetProvided) preferences.push('<i class="fas fa-hard-hat text-primary me-1"></i> Helmet Provided');
        if (ride.preferences.rainGearAvailable) preferences.push('<i class="fas fa-cloud-rain text-primary me-1"></i> Rain Gear');
    }
    
    // Format price display
    const priceDisplay = ride.priceType === 'Monthly' 
        ? `Rs ${ride.price}/month` 
        : `Rs ${ride.price}/seat`;
    
    // Card content
    card.innerHTML = `
        <div class="card-body">
            <div class="row">
                <div class="col-md-8">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${ride.riderImage}" alt="${ride.riderName}" class="rounded-circle me-2" width="40">
                        <div>
                            <h5 class="mb-0">${ride.riderName}</h5>
                            <div class="text-warning small">
                                ${getRatingStars(ride.rating)} <span class="text-muted">(${ride.rating})</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        ${frequencyBadge}
                        ${vehicleBadge}
                        <span class="badge bg-secondary">${daysAvailable}</span>
                    </div>
                    
                    <div class="route-path mb-3">
                        <div class="d-flex align-items-center">
                            <div class="text-center me-2">
                                <i class="fas fa-circle text-success"></i>
                                <div class="route-line"></div>
                                <i class="fas fa-map-marker-alt text-danger"></i>
                            </div>
                            <div>
                                <div class="fw-bold">${ride.startingPoint}</div>
                                <div class="text-muted small">Departure: ${formatTime(ride.departureTime)}</div>
                                <div class="my-2"></div>
                                <div class="fw-bold">${ride.endingPoint}</div>
                                ${ride.returnTime ? `<div class="text-muted small">Return: ${formatTime(ride.returnTime)}</div>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    ${ride.stops.length > 0 ? `
                    <div class="mb-3">
                        <div class="text-muted"><i class="fas fa-map-signs me-2"></i>Stops: ${ride.stops.join(', ')}</div>
                    </div>
                    ` : ''}
                    
                    <div class="mb-3">
                        <div class="text-muted">
                            <i class="fas fa-${ride.vehicleType.toLowerCase() === 'car' ? 'car' : 'motorcycle'} me-2"></i>
                            ${ride.make} (${ride.color})
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <div class="d-flex flex-wrap">
                            ${preferences.map(pref => `<div class="me-3 mb-1 small">${pref}</div>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="text-md-end mt-3 mt-md-0">
                        <div class="bg-light rounded p-3 mb-3">
                            <h5 class="mb-2">${priceDisplay}</h5>
                            <div class="text-muted small mb-2">
                                <i class="fas fa-users me-1"></i> ${ride.seatsAvailable} seat${ride.seatsAvailable > 1 ? 's' : ''} available
                            </div>
                            <div class="text-muted small mb-2">
                                <i class="fas fa-route me-1"></i> ${ride.tripType}
                            </div>
                            <div class="border-top pt-3 mt-3 text-start small">
                                <strong>Contact Info:</strong><br>
                                <div class="text-muted mb-1">
                                    <i class="fas fa-user-check me-1"></i><strong> Preferred:</strong> ${ride.contactInfo.preferredContact}
                                </div>
                                <div class="text-muted mb-1">
                                    <i class="fas fa-phone-alt me-1"></i><strong> Phone:</strong> ${ride.contactInfo.phone}
                                </div>
                                ${ride.contactInfo.alternatePhone 
                                    ? `<div class="text-muted mb-1">
                                            <i class="fas fa-phone me-1"></i><strong> Alt:</strong> ${ride.contactInfo.alternatePhone}
                                    </div>` 
                                    : ''}
                                <div class="text-muted">
                                    <i class="far fa-envelope me-1"></i><strong> Email:</strong> ${ride.contactInfo.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${ride.additionalInfo ? `
            <div class="mt-3 border-top pt-3">
                <div class="text-muted small">
                    <i class="fas fa-info-circle me-2"></i>
                    <span>${ride.additionalInfo}</span>
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Function to format time (24hr to 12hr format)
function formatTime(time) {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Function to generate rating stars
function getRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Function to filter rides based on user input
function filterRides() {
    // Get filter values
    const startingPoint = document.getElementById('startingPoint').value.toLowerCase();
    const endingPoint = document.getElementById('endingPoint').value.toLowerCase();
    const vehicleType = document.getElementById('vehicleType').value;
    const passengers = document.getElementById('passengers').value ? parseInt(document.getElementById('passengers').value) : 0;
    const budget = document.getElementById('budget').value ? parseInt(document.getElementById('budget').value) : 0;
    const departureTime = document.getElementById('departureTime').value;
    const date = document.getElementById('date').value;
    const month = document.getElementById('month').value;
    const onlyAvailable = document.getElementById('showOnlyAvailable').checked;
    
    // Filter rides
    const filteredRides = ridesData.filter(ride => {
        // Check if ride matches all selected filters
        // if (startingPoint && !ride.startingPoint.toLowerCase().includes(startingPoint)) return false;
        // if (endingPoint && !ride.endingPoint.toLowerCase().includes(endingPoint)) return false;
        const route = [
            ride.startingPoint.toLowerCase(),
            ...ride.stops.map(stop => stop.toLowerCase()),
            ride.endingPoint.toLowerCase()
        ];
    
        let startIndex = -1;
        if (startingPoint) {
            startIndex = route.findIndex(loc => loc.includes(startingPoint));
            // If not found in the route, then this ride does not match.
            if (startIndex === -1) {
                return false;
            }
        }

        if (endingPoint) {
            if (startingPoint) {
                // Find the ending point only if it appears after the userStartingPoint
                const endIndex = route.findIndex((loc, index) => index > startIndex && loc.includes(endingPoint));
                if (endIndex === -1) {
                    return false;
                }
            } else {
                // No starting point filter; look anywhere in the route.
                if (!route.some(loc => loc.includes(endingPoint))) {
                    return false;
                }
            }
        }

        if (startingPoint == ride.endingPoint.toLowerCase()){
            return false;
        }
        if (endingPoint == ride.startingPoint.toLowerCase()){
            return false;
        }

        if (vehicleType && ride.vehicleType !== vehicleType) return false;
        if (passengers > 0 && ride.seatsAvailable < passengers) return false;
        if (budget > 0 && ride.price > budget) return false;
        
        // More complex time filtering
        if (departureTime) {
            const filterHours = parseInt(departureTime.split(':')[0]);
            const filterMinutes = parseInt(departureTime.split(':')[1]);
            const rideHours = parseInt(ride.departureTime.split(':')[0]);
            const rideMinutes = parseInt(ride.departureTime.split(':')[1]);
            
            // Convert to minutes for easier comparison
            const filterTimeInMinutes = filterHours * 60 + filterMinutes;
            const rideTimeInMinutes = rideHours * 60 + rideMinutes;
            
            // Allow 30 minutes window before and after
            if (rideTimeInMinutes < filterTimeInMinutes - 30 || rideTimeInMinutes > filterTimeInMinutes + 30) {
                return false;
            }
        }
        
        // Filter by date (for daily rides)
        if (date && ride.frequency === 'Daily') {
            const dayOfWeek = new Date(date).getDay();
            const dayMap = {0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat'};
            if (!ride.daysAvailable.includes(dayMap[dayOfWeek])) {
                return false;
            }
        }
        
        // Filter by month (for monthly rides)
        if (month && ride.frequency === 'Monthly') {
            // Note: In a real application, we would need more information about which months the ride is available
            // For this example, we'll just return true for monthly rides as we don't have month data
            if (month !== '') {
                // This is a placeholder for actual month filtering
                return true;
            }
        }
        
        // Filter only available rides
        if (onlyAvailable && ride.seatsAvailable <= 0) {
            return false;
        }
        
        return true;
    });
    
    // Display filtered rides
    displayRides(filteredRides);
}

// Function to reset all filters
function resetFilters() {
    // Reset all form fields
    document.getElementById('search-form').reset();
    
    // Reset sort dropdown text
    document.getElementById('sortDropdown').textContent = 'Sort by';
    currentSort = 'price-low';
    
    // Display all rides
    displayRides(ridesData);
}

// Function to sort rides
function sortRides(rides) {
    switch (currentSort) {
        case 'price-low':
            rides.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            rides.sort((a, b) => b.price - a.price);
            break;
        case 'departure-early':
            rides.sort((a, b) => {
                const aTime = a.departureTime.split(':').map(Number);
                const bTime = b.departureTime.split(':').map(Number);
                return (aTime[0] * 60 + aTime[1]) - (bTime[0] * 60 + bTime[1]);
            });
            break;
        case 'departure-late':
            rides.sort((a, b) => {
                const aTime = a.departureTime.split(':').map(Number);
                const bTime = b.departureTime.split(':').map(Number);
                return (bTime[0] * 60 + bTime[1]) - (aTime[0] * 60 + aTime[1]);
            });
            break;
        default:
            rides.sort((a, b) => a.price - b.price);
    }
}

// Add animation to ride cards when they appear
function animateRideCards() {
    const rideCards = document.querySelectorAll('.ride-card-animated');
    
    rideCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in-up');
        }, index * 100); // Staggered animation
    });
}

// Optional: Add smooth scrolling for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

