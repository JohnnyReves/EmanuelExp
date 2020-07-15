// Instruction slides

var firstSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">Hello and thank you for participating in this study!<br> ' +
        '<p>This study is part of a series of studies that began two years ago. </p>'+
        'In these studies, we examine aspects of emotional and social intelligence. Many participants have already taken part in the study. These participants rated their emotional responses to a variety of emotional images. You too will watch some of these images today.<br>' +
        '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var secondSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr"><p>In the upcoming task, we will show you a variety of emotional images</p>.'+
    'In some cases, we will ask you to <strong> rate your emotional response</strong> to the picture, as previous participants have done before you. ,p>In other cases, we will ask you to <strong>guess the emotional response of a previous participant to the picture.</strong></p><br>'+
    '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var thirdSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">During the task, you will rate your emotional responses to different images. You will rate your responses on a continuous scale that ranges from -100 to 100. ' +
        'The scale will appear below each picture, as follows:<br><img src="stimuli/scalepic.png" style="width:500px;"><br>' +
        '<p>A rating of <strong>100</strong> means that the image makes you <strong>feel very good</strong></p>. </p>A rating of <strong>-100</strong> means that the image makes you <strong>feel very bad</strong></p>. <p>A rating of <strong>0</strong> means that the picture <strong>does not make you feel good or bad.</strong></p> ' +
        'To indicate your rating, use the mouse to move the cursor to the relevant position on the scale, which best reflects your emotional response to the image. After you rate how you feel, we will show you your rating on a separate subsequent screen.<br>' +
        '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var thirdSlide1 = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">Sometimes, we will ask you to rate your own reaction to the image.  In these cases, you will see a picture, and the rating scale will appear below it.' +
        'You will then move the mouse and click to indicate how you feel in response to the image. It will look like this:<br><img src="stimuli/instructions_rating.png" style="width:500px;"><br>' +
        '<p>Press the spacebar to continue.</p></div>',
    choices: ['space']
}

var thirdSlide2 = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">After you indicate your response, the next slide will show you how you have responded in red.' +
        'You will not need to respond again, just press the spacebar to continue. It will look like this:<br><img src="stimuli/instructions_resoponse.png" style="width:500px;"><br>' +
        '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var fourthSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr"><p>We will ask you to rate your own emotional reactions to some images.</p> We will ask you to guess the emotional responses of previous participants to some images. <p>In these cases, you will see the name of an actual previous participant,' +
        ' and need to guess the emotional response of that participant to the image, by guessing their rating on the scale.It will look like this:<br><img src="stimuli/instructions_estimation.png" style="width:500px;"</p><br>' +
        '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var fifthSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">To indicate the emotional response of a previous participant to a picture, you will also use the same scale that ranges from -100 to 100.<br>' +
        '<p>A rating of <strong>100</strong> means you assume that the image <strong>made the participant feel very good</strong></p>. <p>A rating of <strong>-100</strong> means you assume that the image <strong>made the participant feel very bad.</strong></p> ' +
        '<p>A rating of <strong>0 </strong>means you assume that the image <strong>did not make the participant feel good or bad. </strong></p>' +
        'Pleae use the mouse to move the cursor to the place on the scale that best matches the response of the previous participant. ' +
        '<p>After you guess how the previous participant responded to the picture, we will show you the <b><u>actual</u></b> rating that previous participant gave to the picture when participating </p>' +
        'in the study on a separate subsequent screen.<br>' +
        '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var fifthSlide1 = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">After you guess how the previous participant responded to the pictureimage, in the next screen we will show you the actual rating response of that previous participant gave to the picture image in redwhen participating in the study on a separate subsequent screen. </p>.'+
    '<p>It will look like this:<br><img src="stimuli/instructions_feedback.png" style="width:500px;"</p><br>' +
    '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var sixthSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">Now, you will complete a brief training phase. <p>You will be presented with different pictures and rate how you feel in response to each picture.</p>' +
        ' <p>After the rating, you will see on the screen the rating you gave in response to the picture.</p><br>' +
        '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var seventhSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">The training is over. Now the main task will begin. During the task, you will be presented with multiple pictures. In some cases, ' +
        'you will rate how you feel in response to a picture, and then your emotional reaction will be presented on a separate screen. ' +
        'In other cases, you will guess the emotional response of a previous participant to a picture, and then that participant\'s <b><u>actual</u></b> emotional response will be presented on a separate screen. <br>' +
        '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var seventhSlide1 = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">You will now conduct a short practice run' +
    '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}
var eightSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">Now, we will continue to the next part of the task.<br>' +
        'In this part, we will show you responses of previous participants. You will see five responses of the same participants, in sequence. After viewing the participant\'s responses, we will ask you to evaluate that participant on several dimensions.<br>' +
        'The participants\' responses will appear briefly and then disappear. Therefore, you need to pay attention to their responses in order so that you can evaluate the person who made these responses.<br>' +
        'We are interested in your intuitive judgments. There are no correct or incorrect judgement. Try to make your evaluations quickly based on your gut feeling.<br>' +
        '<p><strong>Press the spacebar to continue.</strong></p></div>',
    choices: ['space']
}

var ninethSlide = {
    type: 'html-keyboard-response',
    stimulus: '<div dir="ltr">The task is over. Please press the spacebar to continue.</div>',
    choices: ['space']
}
