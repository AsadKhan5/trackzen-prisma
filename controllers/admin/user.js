const prisma = require('../../utils/connection');
const customErrors = require('../../errors');

const createUser = async (req, res)=>{
    try{
        console.log("creating user")
        const { userName, email, password, phone, role, empId, experience, address } = req.body;
        
        // Validate required fields
        const requiredFields = {
            empId: "Employee ID",
            userName: "Username", 
            email: "Email",
            password: "Password",
            userName: "Username",
            phone: "Phone Number",
            role: "Role",
        };
        
        const missingFields = [];
        Object.keys(requiredFields).forEach(field => {
            if (!req.body[field] || req.body[field].trim() === "") {
                missingFields.push(requiredFields[field]);
            }
        });
        
        if (missingFields.length > 0) {
            throw new customErrors.BadRequestError(
                `Missing required fields: ${missingFields.join(", ")}`
            );
        }
        
        const newUser = await prisma.user.create({
            data: {
                empId,
                name:userName,
                email,
                password, // In production, hash this password before storing
                phone,
                role,
                experience,
                address
            }
        });
        
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });
        
    }catch(error){
        throw new customErrors.BadRequestError(error.message);
      
    }
}

const getUsers = async (req, res)=>{
    try{
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        res.status(200).json({
            success: true,
            data: users
        });
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
}

// Seed function to insert example data
const seedUsers = async (req, res) => {
    try {
        const exampleUsers = [
            {
                userName: "john_doe",
                email: "john@example.com",
                password: "password123", // Hash this in production!
                firstName: "John",
                lastName: "Doe",
                phone: "+1234567890",
                role: "user",
                empId: "EMP001"
            },
            {
                userName: "jane_smith",
                email: "jane@example.com",
                password: "password123",
                firstName: "Jane",
                lastName: "Smith",
                phone: "+1234567891",
                role: "admin",
                empId: "EMP002"
            },
            {
                userName: "mike_johnson",
                email: "mike@example.com",
                password: "password123",
                firstName: "Mike",
                lastName: "Johnson",
                phone: "+1234567892",
                role: "user",
                avatarUrl: "https://example.com/avatar/mike.jpg",
                empId: "EMP003"
            },
            {
                userName: "sarah_wilson",
                email: "sarah@example.com",
                password: "password123",
                firstName: "Sarah",
                lastName: "Wilson",
                phone: "+1234567893",
                role: "user",
                emailVerified: true,
                empId: "EMP004"
            }
        ];

        // Use createMany for bulk insert
        const result = await prisma.user.createMany({
            data: exampleUsers,
            skipDuplicates: true // Skip if users already exist
        });

        res.status(201).json({
            success: true,
            message: `${result.count} example users created successfully`,
            data: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error seeding users",
            error: error.message
        });
    }
};

module.exports={
    createUser, 
    getUsers,
    seedUsers
}


