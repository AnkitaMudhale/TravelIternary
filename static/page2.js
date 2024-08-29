var destinationInput = document.getElementById('destination');
const startdate = document.getElementById('start-date');
const enddate = document.getElementById('end-date');
const API_Key = "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";
const API_URl = "https://api.openai.com/v1/chat/completions";
var containerTextElement = document.getElementById('container-text');
const Btn = document.getElementById('createItineraryBtn');

function createItinerary(query) {
    return fetch(API_URl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_Key}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query }],
        }),
    });
}

const displayItinerary = async () => {
    containerTextElement.innerHTML = ''; // Clear previous content

    const destination = destinationInput.value;
    const startDate = new Date(startdate.value);
    const endDate = new Date(enddate.value);

    try {
        let currentDate = new Date(startDate);
        let dayNumber = 1;

        while (currentDate <= endDate) {
            const formattedDate = currentDate.toDateString();
            const morningQuery = `Create an itinerary for ${destination} on ${formattedDate} in the morning`;
            const afternoonQuery = `Create an itinerary for ${destination} on ${formattedDate} in the afternoon`;
            const nightQuery = `Create an itinerary for ${destination} on ${formattedDate} at night`;

            // Fetch morning itinerary
            let response = await createItinerary(morningQuery);
            let data = await response.json();
            let morningItinerary = data.choices[0].message.content;

            // Fetch afternoon itinerary
            response = await createItinerary(afternoonQuery);
            data = await response.json();
            let afternoonItinerary = data.choices[0].message.content;

            // Fetch night itinerary
            response = await createItinerary(nightQuery);
            data = await response.json();
            let nightItinerary = data.choices[0].message.content;

            // Construct HTML for the day's itinerary
            const dayHTML = `
                <p>Day ${dayNumber}: ${formattedDate}</p>
                <p>Morning: ${morningItinerary}</p>
                <p>Afternoon: ${afternoonItinerary}</p>
                <p>Night: ${nightItinerary}</p>
            `;

            containerTextElement.insertAdjacentHTML('beforeend', dayHTML);

            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
            dayNumber++;
        }
    } catch (error) {
        console.error("Error fetching itinerary:", error);
        containerTextElement.innerHTML = "<p>Error fetching itinerary. Please try again later.</p>";
    }
};

Btn.addEventListener('click', displayItinerary);
