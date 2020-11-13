//The texts to be presented
const pleaseRespondText = 'How did the picture make YOU feel?';
const howDidTheyRespondText = function(name) {
    return 'How did the picture make ' + name + ' feel?';
};
const howTheyRatedText = function(name) {
    return name + ' felt:';
};
const thisIsYourResponseText = 'YOU felt:';
const answerTheQuestions = '<span style="font-size: 1.3vw">Please answer the following questions:</span>';
const rateLikablility = function(name) {
    return 'How likable is ' + name + '?';
};
const rateTrustworthiness = function(name) {
    return 'How trustworthy is ' + name + '?';
};
const rateCompenetce = function(name) {
    return 'How competent is ' + name + '?';
};
const genderQuestionText = 'What is your gender?';

//Fixation slide
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">' +
        '<span style="font-size: 200px"><b>+</b></span>' +
        '</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 750,
    post_trial_gap: 500,
    data: function(data) {
        return { fullscreen_element: elementInFS(), test_part: 'fixation' }
    }
};

var genderQuestion = {
    type: 'survey-multi-choice',
    questions: [{ prompt: genderQuestionText, options: ['Woman', 'Man', 'Other/Prefer not to say'], required: true }],
    on_finish: function(data) {
        data.Answer = JSON.parse(data.responses).Q0
        const names = (JSON.parse(data.responses).Q0 == 'Man') ? jsPsych.randomization.repeat(M_names, 1) : jsPsych.randomization.repeat(F_names, 1);
        for (var i = 0; i < stage2Objects.other.length; i++) {
            stage2Objects.other[i].name = names[i];
        }
        for (var i = stage2Objects.other.length; i < stage2Objects.other.length + stage3Object.length; i++) {
            stage3Object[i - stage2Objects.other.length].name = names[i];
        }
    },
    data: function(daya) {
        return { fullscreen_element: elementInFS(), test_part: 'Gender question' }
    },
}

var firstCond = function(ExpObj) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function() {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj['index'] + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
            blocks: [{
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: pleaseRespondText,
                    slider: true,
                    locked: false,
                    key_press: 'space',
                    require_response: true
                },
            ],
            labels: ['-100', '100'],
            max: 100,
            min: -100,
            data: function() {
                return {
                    Image: ExpObj.index,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative',
                    fullscreen_element: elementInFS(),
                    test_part: 'First cond trial'
                }
            },
            post_trial_gap: 1000,
            on_finish: function(data) {
                console.log(data)
                firstCondResponses[data.Valence].push(JSON.parse(data.response)[1].slider);
                data.Answer = JSON.parse(data.response)[1].slider
                data.rt = JSON.parse(data.response)[1].rt
            },
        }],
    };
};


var selfCond = function(ExpObj) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function() {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj.index + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
            blocks: [{
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
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
            labels: ['-100<br>Very negative', '100<br>Very positive'],
            max: 100,
            min: -100,
            post_trial_gap: 1000,
            on_finish: function(data) {
                console.log(data)
                data.Answer = JSON.parse(data.response)[1].slider
                data.rt = JSON.parse(data.response)[1].rt
            },
            data: function() {
                return {
                    Image: ExpObj.index,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative',
                    fullscreen_element: elementInFS(),
                    test_part: 'Self cond trial'
                };
            }
        }]
    }
};


var otherCond = function(ExpObj) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function() {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj.index + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
            blocks: function() {
                return [{
                        text: '',
                        slider: false,
                        locked: false,
                        duration: PRE_TRIAL_BREAK
                    },
                    {
                        text: howDidTheyRespondText(ExpObj.name),
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
                        text: howTheyRatedText(ExpObj.name),
                        slider: true,
                        locked: true,
                        key_press: 'space',
                        slider_color: 'red',
                        start: calculateFeedback(ExpObj.mean, ExpObj.SD)
                    },
                ]
            },
            labels: ['-100<br>Very negative', '100<br>Very positive'],
            max: 100,
            min: -100,
            post_trial_gap: 1000,
            data: function() {
                return {
                    Image: ExpObj.index,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative',
                    fullscreen_element: elementInFS(),
                    test_part: 'other cond trial'
                };
            },
            on_finish: function(data) {
                data.Answer = JSON.parse(data.response)[1].slider
                data.feedback = JSON.parse(data.response)[3].slider
                data.rt = JSON.parse(data.response)[1].rt
            }
        }]
    };
};


var stage3ShowImage = function(ImageInd, ImageMean, ImageSD, Person) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function() {
            return '<div style="margin: auto;">' +
                '<img src="stimuli/' + ImageInd + '.jpg" style="width: 500px;" />' +
                '</div>';
        },
        blocks: function() {
            return [{
                text: howTheyRatedText(Person.name),
                duration: 4000,
                slider: true,
                locked: true,
                start: calculateFeedback(ImageMean, ImageSD, Person.cond),
                require_response: false,
            }]
        },
        labels: ['-100<br>Very negative', '100<br>Very positive'],
        max: 100,
        min: -100,
        post_trial_gap: 1000,
        data: function() {
            return {
                Image: ImageInd,
                Person: Person.name,
                test_part: 'Stage 3 Show Images',
                fullscreen_element: elementInFS(),
            };
        },
        on_finish: function(data) {
            console.log(data)
        }
    }
};


var Stage3RateThisPerson = function(Person) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function() {
            return '<div style="margin: 120px auto auto auto;">' +
                answerTheQuestions +
                '</div>';
        },
        blocks: function() {
            return [{
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: rateLikablility(Person.name),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: true,
                    thumb: false
                },
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: rateTrustworthiness(Person.name),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: true,
                    thumb: false
                },
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: rateCompenetce(Person.name),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: true,
                    thumb: false
                }
            ]
        },
        labels: ['not at all', 'Extremely'],
        max: 100,
        min: 0,
        post_trial_gap: 1000,
        slider_dir: 'ltr',
        data: function() {
            console.log()
            return {
                Person: Person.name,
                fullscreen_element: elementInFS(),
                test_part: 'Rating Person'
            };
        },
        on_finish: function(data) {
            data.likeable = JSON.parse(data.response)[0].slider
            data.trustworthy = JSON.parse(data.response)[1].slider
            data.competence = JSON.parse(data.response)[2].slider
        }
    }
};



var stage3SinglePerson = function(Person) {
    console.log(Person)
    var finalArray = [fixation];
    for (var i = 0; i < Person.images.length; i++) {
        var cur = Person.images[i];
        finalArray.push(stage3ShowImage(cur.index, cur.mean, cur.SD, Person));
    }
    finalArray.push(Stage3RateThisPerson(Person));
    return {
        timeline: finalArray
    }
};