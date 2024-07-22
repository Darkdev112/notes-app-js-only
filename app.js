const chalk = require('chalk')
const yargs = require('yargs')
const {addNote, loadNotes, removeNote, readNote} = require('./notes.js');

//Customize yargs version
yargs.version('1.1.0')

//Create add command
yargs.command({
    command : "add",
    describe : "Add a new note",
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : "string"
        },
        body : {
            describe : "Note Description",
            demandOption : true,
            type : "string"
        }
    },
    handler(argv){
        addNote(argv.title, argv.body);
    }
})

//Create remove command
yargs.command({
    command : "remove",
    describe : "Remove a note",
    builder : {
        title : {
            describe : 'Note title',
            demandOption : true,
            type : "string"
        },
    },
    handler(argv){
        removeNote(argv.title)
    }
})


//Create list command
yargs.command({
    command : "list",
    describe : "List the notes",
    handler(){
        const notes = loadNotes();
        console.log('Your Notes :-');
        if(notes.length!==0){
            notes.map((note, index)=>{
                console.log(`Note ${index+1} - ${chalk.green(note.title)}`)
            })
        }
        else{
            console.log(chalk.red("Notes not found"));
        }
    }
})

//Create remove command
yargs.command({
    command : "read",
    describe : "Read a note",
    builder : {
        title : {
            describe : "Note Title",
            demandOption : true,
            type : "string"
        }
    },
    handler(argv){
        readNote(argv.title);
    }
})

yargs.parse();