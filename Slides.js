//Fixation slide
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">' +
        '<span style="font-size: 200px"><b>+</b></span>' +
        '</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 750,
    post_trial_gap: 500,
    data: {test_part: 'fixation'}
};


var selfCond= {
    type: 'html-slider-response-modified',
    stimulus: '<div style="margin: auto;">' +
        '<img src="1460.jpg" style="width: 500px;" />' +
        '</div>',
    blocks: [
        {
            text: '',
            slider: false,
            locked: false,
            duration: 5000
        },
        {
            text: 'please respond, press the space bar to continue',
            slider: true,
            locked: false,
            key_press: 'space',
        },
        {
            text: 'This is your response:',
            slider: true,
            locked: true,
            key_press: 'space',
            slider_color: 'red',
            start: '$1$'
        }
    ]
};


var firstCond= {
    type: 'html-slider-response-modified',
    stimulus: '<div style="margin: auto;">' +
        '<img src="1460.jpg" style="width: 500px;" />' +
        '</div>',
    blocks: [
        {
            text: '',
            slider: false,
            locked: false,
            duration: 5000
        },
        {
            text: 'please respond, press the space bar to continue',
            slider: true,
            locked: false,
            key_press: 'space',
            labels: ['-100', '100'],
        }
    ]
};

var otherCond= {
    type: 'html-slider-response-modified',
    stimulus: '<div style="margin: auto;">' +
        '<img src="1460.jpg" style="width: 500px;" />' +
        '</div>',
    blocks: [
        {
            text: '<span style="font-size: 40px;">Mister Poopy Butthole</span>',
            slider: false,
            locked: false,
            duration: 5000
        },
        {
            text: 'How would mr poopy butthole rate this',
            slider: true,
            locked: false,
            key_press: 'space',
        },
        {
            text: 'This was how they rated this:',
            slider: true,
            locked: true,
            key_press: 'space',
            slider_color: 'red',
            start: '$1$/2'
        }
    ]
};
