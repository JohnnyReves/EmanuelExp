//The texts to be presented
const pleaseRespondText = (gender == 'Male') ? 'אנא דרג את הרגש שהתמונה מעוררת בך' : 'אנא דרגי את הרגש שהתמונה מעוררת בך'
const howDidTheyRespondText = function (name) {
    var sentenceEnd = (gender == 'Male') ? 'ידרג את זה?' : 'תדרג את זה';
    return 'איך ' + name + ' ' + sentenceEnd;
}
const howTheyRatedText = function (name) {
    var sentenceEnd = (gender == 'Male') ? 'דרג את זה.' : 'דרגה את זה.';
    return 'כך ' + name + ' ' + sentenceEnd;
}
const thisIsYourResponseText = 'זוהי תשובתך:';

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
            duration: FASTMODE? 500: 5000
        },
        {
            text: pleaseRespondText,
            slider: true,
            locked: false,
            key_press: 'space',
            require_response: true
        }
    ],
        labels: ['-100', '100'],
        max: 100, min: -100,
        data: function () { return { valence: (jsPsych.timelineVariable('mean', true) >= 0) ? 'Positive' : 'Negative', mean: jsPsych.timelineVariable('mean', true)} },
    post_trial_gap: 1000,
        on_finish: function (data) {
            firstCondResponses[data.valence].push(data.response[1].slider);
        }
    }, fixation],
    timeline_variables: FASTMODE ? [TRAINING_NEG_IMAGES_OBJS[0], TRAINING_POS_IMAGES_OBJS[0]]:
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
                duration: FASTMODE ? 500 : 5000
            },
            {
                text: pleaseRespondText,
                slider: true,
                locked: false,
                key_press: 'space',
                require_response: true
            },
            {
                text: '',
                slider: false,
                locked: false,
                duration: 1000
            },
            {
                text: thisIsYourResponseText,
                slider: true,
                locked: true,
                key_press: 'space',
                slider_color: 'red',
                start: '$1$'
            },
        ],
        labels: ['-100', '100'],
        max: 100, min: -100,
        post_trial_gap: 1000,
        data: function(){return {
            Image: jsPsych.timelineVariable('index', true),
            Valence: parseFloat(jsPsych.timelineVariable('mean', true))>0?'Positive':'Negative'
        };
        }
    }, fixation],
    timeline_variables: experimentObjects,
    randomize_order: false
};


var otherCond = {
    timeline:[{type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                '<img src="stimuli/'+jsPsych.timelineVariable('index', true)+'.jpg" style="width: 500px;" />' +
                '</div>';},
        blocks: function() {return [
            {
                text: '',
                slider: false,
                locked: false,
                duration: FASTMODE? 500:5000
            },
            {
                text: howDidTheyRespondText(jsPsych.timelineVariable('name', true)),
                slider: true,
                locked: false,
                key_press: 'space',
                require_response: true
            },
            {
                text: '',
                slider: false,
                locked: false,
                duration: 1000
            },
            {
                text: howTheyRatedText,
                slider: true,
                locked: true,
                key_press: 'space',
                slider_color: 'red',
                start: calculateFeedback(jsPsych.timelineVariable('mean', true), jsPsych.timelineVariable('SD', true))
            },
        ]},
        labels: ['-100', '100'],
        max: 100, min: -100,
        post_trial_gap: 1000,
        data: function(){return {
            Image: jsPsych.timelineVariable('index', true),
            Valence: parseFloat(jsPsych.timelineVariable('mean', true))>0?'Positive':'Negative'
        };}},fixation],
    timeline_variables: experimentObjects,
    randomize_order: false
};