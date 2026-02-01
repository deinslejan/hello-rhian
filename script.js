// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const messageSection = document.getElementById('messageSection');
    const activitiesSection = document.getElementById('activitiesSection');
    const yes1Checkbox = document.getElementById('yes1');
    const yes2Checkbox = document.getElementById('yes2');
    const submitBtn = document.getElementById('submitBtn');
    const finalMessage = document.getElementById('finalMessage');

    // Card opening animation
    envelope.addEventListener('click', function() {
        envelope.classList.add('opened');
        
        // Show message section after envelope animation
        setTimeout(() => {
            messageSection.classList.add('visible');
        }, 1000);
    });

    // Handle "Yes" checkbox clicks
    function handleYesClick(clickedCheckbox, otherCheckbox) {
        // If one is checked, uncheck the other
        if (clickedCheckbox.checked) {
            otherCheckbox.checked = false;
            
            // Smooth scroll to activities section
            setTimeout(() => {
                activitiesSection.classList.add('visible');
                
                // Scroll to activities section
                activitiesSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 300);
        } else {
            // If unchecking, hide activities section
            activitiesSection.classList.remove('visible');
            finalMessage.classList.remove('visible');
        }
    }

    yes1Checkbox.addEventListener('change', () => handleYesClick(yes1Checkbox, yes2Checkbox));
    yes2Checkbox.addEventListener('change', () => handleYesClick(yes2Checkbox, yes1Checkbox));

    // Handle submit button
    submitBtn.addEventListener('click', function() {
        const selectedActivities = document.querySelectorAll('input[name="activity"]:checked');
        
        if (selectedActivities.length > 0) {
            // Get activity labels
            const activities = Array.from(selectedActivities).map(cb => {
                return cb.parentElement.querySelector('.activity-name').textContent;
            });
            
            // Update the selected list in final message
            const selectedList = document.getElementById('selectedList');
            selectedList.innerHTML = activities.map(activity => 
                `<li>${activity}</li>`
            ).join('');
            
            // Show final message
            finalMessage.classList.add('visible');
            
            // Scroll to final message
            setTimeout(() => {
                finalMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
            
            // Log to console (currently just for viewing, not sent anywhere)
            console.log('Selected activities:', activities);
            console.log('Note: These selections are currently only displayed on the page. To save them, you would need to integrate with a backend service or email API.');
        } else {
            alert('Please select at least one activity!');
        }
    });

    // Activity items use default checkbox behavior
});
