const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
app.get('/', (request, response)=>{
    response.send("<h1>Hello World</h1>").end()
})
app.get('/api/notes', (request, response)=>{
    return response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id === id);

    if (!note) {
        return response.status(404).json({ error: 'Note not found' });
    }

    response.json(note);
});

const generate_index = () => {
    const max_index = notes.length ? Math.max(...notes.map(note => Number(note.id))) : 0;
    return String(max_index + 1);
};


app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).json({ error: 'Content missing' });
    }

    const new_note = {
        id: String(generate_index()),
        content: body.content,
        important: body.important || false,
    };

    notes = notes.concat(new_note);

    response.json(new_note);
});



const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})




