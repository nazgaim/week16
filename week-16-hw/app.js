// Function to get total population by country per year
function getTotalPopulationByCountry(country) {
    const pipeline = [{
            $match: {
                Country: country
            },
        },
        {
            $group: {
                _id: "$Year",
                totalPopulation: {
                    $sum: {
                        $add: ["$Population_Male", "$Population_Female"]
                    },
                },
            },
        },
        {
            $sort: {
                _id: 1
            },
        },
        {
            $project: {
                _id: 0,
                year: "$_id",
                totalPopulation: 1,
            },
        },
    ];

    return db.world_population.aggregate(pipeline).toArray();
}

// Usage example
const country = "United States";
const result = getTotalPopulationByCountry(country);
printjson(result);