const pool = require("../config/db");
const calculateDistance = require("../utils/distance");

// @route   POST /addSchool
// @desc    Add a new school to the database
exports.addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Valid 'name' is required" });
    }
    if (!address || typeof address !== "string" || address.trim() === "") {
      return res.status(400).json({ message: "Valid 'address' is required" });
    }
    if (latitude === undefined || latitude === null || isNaN(Number(latitude))) {
      return res.status(400).json({ message: "Valid 'latitude' is required" });
    }
    if (longitude === undefined || longitude === null || isNaN(Number(longitude))) {
      return res.status(400).json({ message: "Valid 'longitude' is required" });
    }

    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const values = [
      name.trim(),
      address.trim(),
      parseFloat(latitude),
      parseFloat(longitude),
    ];

    const [result] = await pool.query(query, values);

    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } catch (error) {
    console.error("Error in addSchool:", error);
    next(error);
  }
};

// @route   GET /listSchools
// @desc    List all schools sorted by proximity
exports.listSchools = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    if (latitude === undefined || latitude === null || isNaN(Number(latitude))) {
      return res
        .status(400)
        .json({ message: "Valid 'latitude' is required in query parameters" });
    }
    if (longitude === undefined || longitude === null || isNaN(Number(longitude))) {
      return res
        .status(400)
        .json({ message: "Valid 'longitude' is required in query parameters" });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const [rows] = await pool.query("SELECT * FROM schools");

    const schoolsWithDistance = rows.map((school) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );

      return {
        ...school,
        distance, // Raw distance in numbers for accurate sorting
      };
    });

    // Sort schools by nearest distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    // Format distance for better readability in response
    const formattedSchools = schoolsWithDistance.map((school) => ({
      ...school,
      distance: school.distance.toFixed(2) + " km",
    }));

    res.status(200).json(formattedSchools);
  } catch (error) {
    console.error("Error in listSchools:", error);
    next(error);
  }
};