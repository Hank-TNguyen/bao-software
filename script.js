

// Function to scroll to a section smoothly
function scrollToSection(event) {
    event.preventDefault();
    const sectionId = event.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add click event listeners for the section titles
document.addEventListener('DOMContentLoaded', function () {
    const sectionTitles = document.querySelectorAll('nav a');
    sectionTitles.forEach(title => {
        title.addEventListener('click', scrollToSection);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var fullImageView = document.getElementById('full-image-view');
    var modalContent = document.querySelector('.modal-content');
    var close = document.querySelector('.close');

    // Function to hide the modal
    function hideModal() {
        fullImageView.style.display = 'none';
    }

    // Add click event to close button
    close.addEventListener('click', function() {
        hideModal();
    });

    // Add click event to the modal background to close the modal
    fullImageView.addEventListener('click', function(event) {
        if (event.target === fullImageView) {
            hideModal();
        }
    });

    // Add keyup event to close the modal with the Escape key
    document.addEventListener('keyup', function(event) {
        if (event.key === 'Escape') {
            hideModal();
        }
    });

    // Get all collage photos
    var photos_overlay = document.querySelectorAll('.overlay');
    
    // Add click event to each photo
    photos_overlay.forEach(function(photo_overlay) {
        photo_overlay.addEventListener('click', function() {
            var photo = photo_overlay.parentElement.children[0];
            var fullImage = document.getElementById('full-image');
            var imageStory = document.getElementById('image-story');
            var storyElement = document.getElementById(photo.dataset.story);

            // Extract the filename from the thumbnail source
            var filename = photo.src.split('/').pop();
            
            // Generate the full-size image filename
            var fullImageFilename = 'full_' + filename;
            
            // Replace the thumbnail filename with the full-size image filename
            var fullImageSrc = photo.src.replace(filename, fullImageFilename);
            
            // Set the full image source and alt text
            fullImage.src = fullImageSrc;
            fullImage.alt = 'Full-sized view of ' + photo.alt;
            
            // Set the story content
            imageStory.innerHTML = storyElement.innerHTML;
            
            // Wait for the image to load before checking its orientation
            fullImage.onload = function() {
                // Determine the orientation of the image
                if (fullImage.naturalWidth > fullImage.naturalHeight) {
                    // Landscape orientation
                    modalContent.classList.add('landscape');
                    modalContent.classList.remove('portrait');
                } else {
                    // Portrait orientation
                    modalContent.classList.add('portrait');
                    modalContent.classList.remove('landscape');
                }
            };

            // Show the modal
            fullImageView.style.display = 'block';
        });
    });
});