// shuffle images' src
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// create a grid of images
function setShuffledImages(shuffledImages, flag) {
    document.querySelector('.cards').innerHTML = '';
    for (let i = 0; i < 4; i++) {
        document.querySelector('.cards').innerHTML +=
            `<div class="cards-row">
                    <div class="card col-3 col-md-2 col-lg-1 p-0">
                        <img src="images/${flag === 'add' ? shuffledImages[4 * i] : 'question-mark'}.jpg" alt="${flag === 'add' ? shuffledImages[4 * i] : 'question-mark'}" width="100%">
                    </div>
                    <div class="card col-3 col-md-2 col-lg-1 p-0">
                        <img src="images/${flag === 'add' ? shuffledImages[4 * i + 1] : 'question-mark'}.jpg" alt="${flag === 'add' ? shuffledImages[4 * i + 1] : 'question-mark'}" width="100%">
                    </div>
                    <div class="card col-3 col-md-2 col-lg-1 p-0">
                        <img src="images/${flag === 'add' ? shuffledImages[4 * i + 2] : 'question-mark'}.jpg" alt="${flag === 'add' ? shuffledImages[4 * i + 2] : 'question-mark'}" width="100%">
                    </div>
                    <div class="card col-3 col-md-2 col-lg-1 p-0">
                        <img src="images/${flag === 'add' ? shuffledImages[4 * i + 3] : 'question-mark'}.jpg" alt="${flag === 'add' ? shuffledImages[4 * i + 3] : 'question-mark'}" width="100%">
                    </div>
                </div>`;
    }
}

// toggle alert
function toggleAlert(card) {
    card.classList.add('animation-alert');
    var clearAnimation = setTimeout(() => {
        card.classList.remove('animation-alert');
    }, 1000);
}

// set images tags
function setImageTag(card, image, counter, numberOfRevealedImages) {
    card.firstElementChild.setAttribute('src', `images/${image}.jpg`);
    card.firstElementChild.setAttribute('alt', `${image}`);
    card.firstElementChild.setAttribute('width', '100%');
    return [++counter, ++numberOfRevealedImages];
}

// start function
function start() {
    document.querySelector('body').style.background = 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(121, 9, 60, 1) 35%, rgba(0, 212, 255, 1) 100%)'
    const images = [
        'card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8',
        'card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8'
    ];
    var shuffledImages = shuffle(images);

    // display images
    setShuffledImages(shuffledImages, 'add');

    // hiding images
    var hideImages = setTimeout(() => {
        setShuffledImages(shuffledImages, 'remove');

        // start the game
        var cards = document.querySelectorAll('.card'),
            counter = 0,
            temp1 = '',
            temp2 = '',
            numberOfRevealedImages = 0;


        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', (event) => {

                // when clicking on visible images
                if (cards[i].firstElementChild.getAttribute('src') !== 'images/question-mark.jpg') {
                    return;
                }


                // the first image in each pair
                if (counter === 0) {
                    temp1 = shuffledImages[i];
                    [counter, numberOfRevealedImages] = setImageTag(cards[i], shuffledImages[i], counter, numberOfRevealedImages);
                    return;
                }


                // the second image in each pair
                if (counter === 1) {
                    temp2 = shuffledImages[i];
                    if ((temp1 === temp2)) {
                        [counter, numberOfRevealedImages] = setImageTag(cards[i], shuffledImages[i], counter, numberOfRevealedImages);
                    } else {
                        toggleAlert(cards[i])
                    }
                }


                // check complete status
                if (numberOfRevealedImages === 16) {
                    for (let j = 0; j < cards.length; j++) {
                        document.querySelector('body').style.background = 'linear-gradient(90deg, rgba(53,40,54,1) 0%, rgba(179,196,214,1) 37%, rgba(92,99,93,1) 100%)'
                    }
                }


                // reset the counter to start a new pair
                if (counter === 2) {
                    counter = 0;
                    return;
                }
            })
        }
    }, 5000);
    var countDownCounter = 5;
    var countdown = setInterval(() => {
        countDownCounter--;
        document.querySelector('.count-down').innerHTML = countDownCounter;
        if (countDownCounter === 0) {
            clearInterval(countdown)
        }
    }, 1000);
}

window.onload = () => {
    start()
    
}


// restart the game
document.querySelector('button').addEventListener('click', (event) => {
    start()
})