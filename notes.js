const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes();
    
    const duplicateNotes = notes.filter((note) => {
        return note.title===title
    })

    debugger

    if(duplicateNotes.length===0)
    {
        notes.push({
            title : title, 
            body : body
        });
        saveNotes(notes);
        console.log(chalk.green("New note added!"));
    }
    else{
        console.log(chalk.red("Title already taken!"));
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    let flag= false;
    if(notes.length!=0)
    {
        const filteredNotes = notes.filter((note) => {
            if(note.title === title)
            {
                flag=true;
            }
            else{
                return note;
            }
        })
        saveNotes(filteredNotes);
        flag ? console.log(chalk.green("Note removed!")) : console.log(chalk.red("No such note to remove!"))
    }
    else{
        console.log("No notes to remove!");
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title===title)

    debugger;

    if(!duplicateNote){
        console.log(chalk.red("No such note found"));
    }
    else{
        console.log("Title : ", chalk.blue(duplicateNote.title));
        console.log("Description : ", chalk.magenta(duplicateNote.body));
    }
}

const saveNotes = (notes) => {
    const JSONData = JSON.stringify(notes)
    fs.writeFileSync('notes.json', JSONData)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const parsedData = JSON.parse(dataBuffer);
        return parsedData
    } catch (error) {
        return []
    }
}

module.exports={addNote, loadNotes, removeNote, readNote}