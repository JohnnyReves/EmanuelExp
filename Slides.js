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


var firstCond = {
    timeline:[{type: 'html-slider-response-modified',
    stimulus: function () {
        return '<div style="margin: auto;">' +
        '<img src="stimuli/'+jsPsych.timelineVariable('index', true)+'.jpg" style="width: 500px;" />' +
        '</div>';},
    blocks: [
        {
            text: '',
            slider: false,
            locked: false,
            duration: 5000
        },
        {
            text: 'Please respond',
            slider: true,
            locked: false,
            key_press: 'space',
            require_response: true
        }
    ],
    labels: ['-100', '100'],
    post_trial_gap: 1000,
    on_finish: function (data) {
        firstCondResponses.push(data.response[1].slider);
    }},fixation],
    timeline_variables: FASTMODE?(TRAINING_POS_IMAGES_OBJS.concat(TRAINING_NEG_IMAGES_OBJS)).slice(0,2):
                                 TRAINING_POS_IMAGES_OBJS.concat(TRAINING_NEG_IMAGES_OBJS),
    randomize_order: true
};


var selfCond = {
    timeline:[{type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                '<img src="stimuli/'+jsPsych.timelineVariable('index', true)+'.jpg" style="width: 500px;" />' +
                '</div>';},
        blocks: [
            {
                text: '',
                slider: false,
                locked: false,
                duration: 5000
            },
            {
                text: 'Please respond',
                slider: true,
                locked: false,
                key_press: 'space',
                require_response: true
            },
            {
                text: 'This is your response:',
                slider: true,
                locked: true,
                key_press: 'space',
                slider_color: 'red',
                start: '$1$'
            },
        ],
        labels: ['-100', '100'],
        post_trial_gap: 1000,
        data: function(){return {
            Image: jsPsych.timelineVariable('index', true),
            Valence: parseFloat(jsPsych.timelineVariable('mean', true))>0?'Positive':'Negative'
        };}},fixation],
    timeline_variables: FASTMODE?(POSITIVE_IMAGES_OBJS.concat(NEGATIVE_IMAGES_OBJS)).slice(0,2):
                                 POSITIVE_IMAGES_OBJS.concat(NEGATIVE_IMAGES_OBJS),
    randomize_order: true
};


var otherCond = {
    timeline:[{type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                '<img src="stimuli/'+jsPsych.timelineVariable('index', true)+'.jpg" style="width: 500px;" />' +
                '</div>';},
        blocks: [
            {
                text: '',
                slider: false,
                locked: false,
                duration: 5000
            },
            {
                text: 'How would '+name+' rate this',
                slider: true,
                locked: false,
                key_press: 'space',
                require_response: true
            },
            {
                text: 'This is your response:',
                slider: true,
                locked: true,
                key_press: 'space',
                slider_color: 'red',
                start: '$1$'
            },
        ],
        labels: ['-100', '100'],
        post_trial_gap: 1000,
        data: function(){return {
            Image: jsPsych.timelineVariable('index', true),
            Valence: parseFloat(jsPsych.timelineVariable('mean', true))>0?'Positive':'Negative'
        };}},fixation],
    timeline_variables: FASTMODE?(POSITIVE_IMAGES_OBJS.concat(NEGATIVE_IMAGES_OBJS)).slice(0,2):
                                 POSITIVE_IMAGES_OBJS.concat(NEGATIVE_IMAGES_OBJS),
    randomize_order: true
};