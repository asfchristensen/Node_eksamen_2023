import { Router } from "express";
const router = Router();

router.post("/api/auth/signup", async (req, res) => {
    const { username, password, email } = req.body;
    const sanitizedUsername = validator.escape(username);
    const sanitizedPassword = validator.escape(password);
    const sanitizedEmail = validator.escape(email);
    console.log("2 ",req.body);
    
    const userExist = await db.collection("users").find({ email: sanitizedEmail }).toArray();
    console.log("3 ", userExist);

    if (userExist.length === 0) {
        const hashedPassword = await bcrypt.hash(sanitizedPassword, 12);
        const userRole = 2;

        const newUser = { username: sanitizedUsername, email: sanitizedEmail, password: hashedPassword, role_id: userRole };
        console.log("4 ",newUser);

        db.collection("users").insertOne(newUser);

        return res.status(200).send({ data: sanitizedUsername });
    } else {
        console.log("Signup failed");
        return  res.status(400).send({ message: "error" });
    }
});

export default router;