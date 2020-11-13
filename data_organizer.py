import csv, json

# File to organize
file = 'exp-data-1604700408519.csv'

# Read File
with open (file) as f:
    r = csv.reader(f)
    data = []
    for l in r:
        data.append(l)

# Prepare output
qualities = data[0][19:22]
data = data[1:]
output = [['exp_part', 'index', 'rt', 'response', 'stimulus', 'valence', 'feedback', 'person', 'fullscreen_element']]

# iterate data
for l in data:
    if l[19] != '': #if person rating trial
        obj = json.loads(l[13])
        for i in range(1,len(obj),2): #create a row for each question
            response = obj[i]['slider']
            rt = obj[i]['rt']
            output.append([
                qualities[int((i-1)/2)], l[3], rt, response, l[14], l[15], l[17], l[18], l[8]
            ])
        continue
    if l[9] == 'First cond trial' or \
            l[9] == 'Self cond trial' or \
            l[9] == 'other cond trial' or \
            l[9] == 'Gender question': # If self/other/first cond trial or gender question:
        response = l[10]
    else:
        response = l[13]
    output.append([
        l[9], l[3], l[5], response, l[14], l[15], l[17], l[18], l[8]
    ])

# Write
with open('_'+file, 'w') as f:
    w = csv.writer(f)
    w.writerows(output)
