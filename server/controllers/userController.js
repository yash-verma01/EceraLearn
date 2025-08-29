export const RegisterUser = async(req, res) => {
    try {
        res.send("User registered successfully");
      // Registration logic here
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
