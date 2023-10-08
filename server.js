const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');


const app = express();
const port = 5000;
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

mongoose.connect('mongodb+srv://darshanckick:kick@cluster0.b9m2glb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));


/* ------------------------------------------------------ data post and get 01  ------------------------------------------------  */
const dataSchema = new mongoose.Schema({
    qno:Number,
    Question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer: String
})

const DataModel = mongoose.model('Data', dataSchema);

app.delete('/api/items/1/:id', async (req, res) => {
  try {
    const item = await DataModel.findByIdAndRemove(req.params.id);
    if (!item) {
      return res.status(201).json({ Status : "BAD" });
    }
    return res.status(200).json({ Status : "OK" });
  } catch (error) {
    return res.status(100).json({ message: 'Server error' });
  }
});


app.put('/edit/put/:qno', async (req, res) => {
  const { qno } = req.params;
  const {answer} = req.params;
  const { option1, option2, option3, option4, Question } = req.body;

  try {
    // Find the user by email
    const user = await DataModel.findOne({ qno });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashqno = await bcrypt.hash(answer, saltRounds);

    // Update the user's password
    user.answer = hashqno;
    user.option1 = option1;
    user.option2 = option2;
    user.option3 = option3;
    user.option4 = option4;
    user.Question = Question;
    await user.save();

    res.status(200).json({ Status : "OK" });
  } catch (error) {
    console.error(error);
    res.status(205).json({ message: 'Internal Server Error' });
  }
});

app.get('/data/:qno', async (req, res) => {
  try {
    const qno = req.params.qno;
    const user = await DataModel.find({ qno });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/vall1', (req, res) => {
  const {value1 , qno} = req.body; 
  DataModel.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value1, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})


app.post('/vall2', (req, res) => {
  const {value2 ,qno} = req.body; 
  DataModel.findOne({qno:qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value2, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})

app.post('/vall3', (req, res) => {
  const {value3 , qno} = req.body; 
  DataModel.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value3, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})


app.post('/vall4', (req, res) => {
  const {value4 , qno} = req.body; 
  DataModel.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value4, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})

app.post('/data', async (req, res) => {
  try{
    const {qno ,Question, option1, option2, option3, option4, answer } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      DataModel.create({qno ,Question, option1, option2, option3, option4, answer: hash })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});

app.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  DataModel.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})

/* ------------------------------------------------------ data post and get 02 ------------------------------------------------*/

const data02Schema = new mongoose.Schema({
  qno:Number,
  Question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String
})

const Data02Model = mongoose.model('Data02', data02Schema);

app.delete('/api/items/2/:id', async (req, res) => {
  try {
    const item = await Data02Model.findByIdAndRemove(req.params.id);
    if (!item) {
      return res.status(201).json({ Status : "BAD" });
    }
    return res.status(200).json({ Status : "OK" });
  } catch (error) {
    return res.status(100).json({ message: 'Server error' });
  }
});


app.get('/data/02/:qno', async (req, res) => {
  try {
    const qno = req.params.qno;
    const user = await Data02Model.find({ qno });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/vall1/02', (req, res) => {
  const {value1 , qno} = req.body; 
  Data02Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value1, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall2/02', (req, res) => {
  const {value2 ,qno} = req.body; 
  Data02Model.findOne({qno:qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value2, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.post('/vall3/02', (req, res) => {
  const {value3 , qno} = req.body; 
  Data02Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value3, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall4/02', (req, res) => {
  const {value4 , qno} = req.body; 
  Data02Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value4, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.get('/dataway02', (req, res) => {
  Data02Model.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})


app.post('/data/02', async (req, res) => {
  try{
    const {qno ,Question, option1, option2, option3, option4, answer } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      Data02Model.create({qno ,Question, option1, option2, option3, option4, answer: hash })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});

/* ------------------------------------------------------------------------- Data Post And Get 03 --------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

const data03Schema = new mongoose.Schema({
  qno:Number,
  Question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String
})

const Data03Model = mongoose.model('Data03', data03Schema);


app.delete('/api/items/3/:id', async (req, res) => {
  try {
    const item = await Data03Model.findByIdAndRemove(req.params.id);
    if (!item) {
      return res.status(201).json({ Status : "BAD" });
    }
    return res.status(200).json({ Status : "OK" });
  } catch (error) {
    return res.status(100).json({ message: 'Server error' });
  }
});



app.get('/data/03/:qno', async (req, res) => {
  try {
    const qno = req.params.qno;
    const user = await Data03Model.find({ qno });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/vall1/03', (req, res) => {
  const {value1 , qno} = req.body; 
  Data03Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value1, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall2/03', (req, res) => {
  const {value2 ,qno} = req.body; 
  Data03Model.findOne({qno:qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value2, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.post('/vall3/03', (req, res) => {
  const {value3 , qno} = req.body; 
  Data03Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value3, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall4/03', (req, res) => {
  const {value4 , qno} = req.body; 
  Data03Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value4, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.get('/dataway03', (req, res) => {
  Data03Model.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})


app.post('/data/03', async (req, res) => {
  try{
    const {qno ,Question, option1, option2, option3, option4, answer } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      Data03Model.create({qno ,Question, option1, option2, option3, option4, answer: hash })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});



/* -------------------------------------------------------------------------------- Data Get An Post 04 ---------------------------------------------------------*/


const data04Schema = new mongoose.Schema({
  qno:Number,
  Question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String
})

const Data04Model = mongoose.model('Data04', data04Schema);



app.delete('/api/items/4/:id', async (req, res) => {
  try {
    const item = await Data04Model.findByIdAndRemove(req.params.id);
    if (!item) {
      return res.status(201).json({ Status : "BAD" });
    }
    return res.status(200).json({ Status : "OK" });
  } catch (error) {
    return res.status(100).json({ message: 'Server error' });
  }
});

app.get('/data/04/:qno', async (req, res) => {
  try {
    const qno = req.params.qno;
    const user = await Data04Model.find({ qno });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/vall1/04', (req, res) => {
  const {value1 , qno} = req.body; 
  Data04Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value1, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall2/04', (req, res) => {
  const {value2 ,qno} = req.body; 
  Data04Model.findOne({qno:qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value2, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.post('/vall3/04', (req, res) => {
  const {value3 , qno} = req.body; 
  Data04Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value3, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall4/04', (req, res) => {
  const {value4 , qno} = req.body; 
  Data04Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value4, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.get('/dataway04', (req, res) => {
  Data04Model.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})


app.post('/data/04', async (req, res) => {
  try{
    const {qno ,Question, option1, option2, option3, option4, answer } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      Data04Model.create({qno ,Question, option1, option2, option3, option4, answer: hash })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});

/* --------------------------------------------------------------- Data Get And Post 5 ------------------------------------------------------------*/


const data05Schema = new mongoose.Schema({
  qno:Number,
  Question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String
})

const Data05Model = mongoose.model('Data05', data05Schema);

app.delete('/api/items/5/:id', async (req, res) => {
  try {
    const item = await Data05Model.findByIdAndRemove(req.params.id);
    if (!item) {
      return res.status(201).json({ Status : "BAD" });
    }
    return res.status(200).json({ Status : "OK" });
  } catch (error) {
    return res.status(100).json({ message: 'Server error' });
  }
});


app.get('/data/05/:qno', async (req, res) => {
  try {
    const qno = req.params.qno;
    const user = await Data05Model.find({ qno });
    if (!user) {
      return res.status(405).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/vall1/05', (req, res) => {
  const {value1 , qno} = req.body; 
  Data05Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value1, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall2/05', (req, res) => {
  const {value2 ,qno} = req.body; 
  Data05Model.findOne({qno:qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value2, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.post('/vall3/05', (req, res) => {
  const {value3 , qno} = req.body; 
  Data05Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value3, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall4/05', (req, res) => {
  const {value4 , qno} = req.body; 
  Data05Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value4, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.get('/dataway05', (req, res) => {
  Data05Model.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})


app.post('/data/05', async (req, res) => {
  try{
    const {qno ,Question, option1, option2, option3, option4, answer } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      Data05Model.create({qno ,Question, option1, option2, option3, option4, answer: hash })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});


/* ------------------------------------------------------------------------- Data Get Post 06 -------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------------*/

const data06Schema = new mongoose.Schema({
  qno:Number,
  Question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String
})

const Data06Model = mongoose.model('Data06', data06Schema);


app.delete('/api/items/6/:id', async (req, res) => {
  try {
    const item = await Data06Model.findByIdAndRemove(req.params.id);
    if (!item) {
      return res.status(201).json({ Status : "BAD" });
    }
    return res.status(200).json({ Status : "OK" });
  } catch (error) {
    return res.status(100).json({ message: 'Server error' });
  }
});

app.get('/data/06/:qno', async (req, res) => {
  try {
    const qno = req.params.qno;
    const user = await Data06Model.find({ qno });
    if (!user) {
      return res.status(406).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/vall1/06', (req, res) => {
  const {value1 , qno} = req.body; 
  Data06Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value1, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall2/06', (req, res) => {
  const {value2 ,qno} = req.body; 
  Data06Model.findOne({qno:qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value2, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.post('/vall3/06', (req, res) => {
  const {value3 , qno} = req.body; 
  Data06Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value3, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall4/06', (req, res) => {
  const {value4 , qno} = req.body; 
  Data06Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value4, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.get('/dataway06', (req, res) => {
  Data06Model.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})


app.post('/data/06', async (req, res) => {
  try{
    const {qno ,Question, option1, option2, option3, option4, answer } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      Data06Model.create({qno ,Question, option1, option2, option3, option4, answer: hash })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});

/* ------------------------------------------------------------------- Get Data Post Data 07 -------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------*/

const data07Schema = new mongoose.Schema({
  qno:Number,
  Question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String
})

const Data07Model = mongoose.model('Data07', data07Schema);

app.delete('/api/items/7/:id', async (req, res) => {
  try {
    const item = await Data07Model.findByIdAndRemove(req.params.id);
    if (!item) {
      return res.status(201).json({ Status : "BAD" });
    }
    return res.status(200).json({ Status : "OK" });
  } catch (error) {
    return res.status(100).json({ message: 'Server error' });
  }
});


app.get('/data/07/:qno', async (req, res) => {
  try {
    const qno = req.params.qno;
    const user = await Data07Model.find({ qno });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/vall1/07', (req, res) => {
  const {value1 , qno} = req.body; 
  Data07Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value1, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall2/07', (req, res) => {
  const {value2 ,qno} = req.body; 
  Data07Model.findOne({qno:qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value2, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.post('/vall3/07', (req, res) => {
  const {value3 , qno} = req.body; 
  Data07Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value3, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall4/07', (req, res) => {
  const {value4 , qno} = req.body; 
  Data07Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value4, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.get('/dataway07', (req, res) => {
  Data07Model.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})


app.post('/data/07', async (req, res) => {
  try{
    const {qno ,Question, option1, option2, option3, option4, answer } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      Data07Model.create({qno ,Question, option1, option2, option3, option4, answer: hash })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});




/*------------------------------------------------------------- Data Get Post Put 08 ---------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------*/


const data08Schema = new mongoose.Schema({
  qno:Number,
  Question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: String
})

const Data08Model = mongoose.model('Data08', data08Schema);

app.delete('/api/items/8/:id', async (req, res) => {
  try {
    const item = await Data08Model.findByIdAndRemove(req.params.id);
    if (!item) {
      return res.status(201).json({ Status : "BAD" });
    }
    return res.status(200).json({ Status : "OK" });
  } catch (error) {
    return res.status(100).json({ message: 'Server error' });
  }
});


app.get('/data/08/:qno', async (req, res) => {
  try {
    const qno = req.params.qno;
    const user = await Data08Model.find({ qno });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/vall1/08', (req, res) => {
  const {value1 , qno} = req.body; 
  Data08Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value1, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall2/08', (req, res) => {
  const {value2 ,qno} = req.body; 
  Data08Model.findOne({qno:qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value2, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.post('/vall3/08', (req, res) => {
  const {value3 , qno} = req.body; 
  Data08Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value3, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})



app.post('/vall4/08', (req, res) => {
  const {value4 , qno} = req.body; 
  Data08Model.findOne({qno: qno})
  .then(user => {
    if(user) {
      bcrypt.compare(value4, user.answer, (err, response) => {
        if(response) {
          return res.json({Status: "200"})
        }else {
          return res.json({Status: "400"})
        }
      })
    } else {
      return res.json("No Record existed")
    }
  })
})




app.get('/dataway08', (req, res) => {
  Data08Model.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})


app.post('/data/08', async (req, res) => {
  try{
    const {qno ,Question, option1, option2, option3, option4, answer } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      Data08Model.create({qno ,Question, option1, option2, option3, option4, answer: hash })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});












































































/* -------------------------------------------------------------------------- User Phrase Data ----------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/






const UserdataSchema = new mongoose.Schema({
  Data: String
})

const UserDataModel = mongoose.model('User_data', UserdataSchema);


app.post('/userdata', async (req, res) => {
  try{
    const {Data } = req.body;
    bcrypt.hash(Data, 10)
    .then(hash => {
      UserDataModel.create({Data : hash })
      res.status(200).json("OK");
    })
  } catch (error) {
    res.status(400).json("BAD");
  }

});




















const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.json('The token is missing')
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if(err) {
        return res.json("The token is wrong")
      } else {
        req.email = decoded.email;
        next()
      }
    })
  }
}

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status : "OK"})
})

app.get('/valid', verifyUser, (req, res) => {
  return res.json({email: req.email})
})














    const ValidIdSchema = new mongoose.Schema({
      email : String,
      valid: String,
      Time : String,
      trID : String
      
    });
    
    const ValIDModel = mongoose.model('Valid_ID', ValidIdSchema)


    app.get('/validd/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const user = await ValIDModel.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(205).json({ message: 'Internal server error' });
      }
    });

    app.post('/validid/post', async (req, res) => {
      try {
        const { email, valid , trID} = req.body;
        const Time = new Date().toLocaleTimeString();
        const newPost = new ValIDModel({ email, Time, valid, trID });
        await newPost.save();
        res.status(201).json({ Status : "OK", post: newPost });
      } catch (err) {
        res.status(205).json({ error: err.message });
      }
    });

    app.post('/validtr/id', async (req, res) => {
      const { trID } = req.body;
      
      // Check if the email exists in the database
      const user = await ValIDModel.findOne({ trID });
    
      if (user) {
        res.status(200).json({Status : 'OK'});
      } else {
        res.status(210).json({Status : 'BAD'});
      }
    });


const TraIdSchema = new mongoose.Schema({
  email : String,
  trID : String,
  Time : String
  
});

const TrIdModel = mongoose.model('TR_ID', TraIdSchema)



app.post('/trid/id', async (req, res) => {
  const { trID } = req.body;
  
  // Check if the email exists in the database
  const user = await TrIdModel.findOne({ trID });

  if (user) {
    res.status(200).json({Status : 'OK'});
  } else {
    res.status(210).json({Status : 'BAD'});
  }
});



app.post('/trid', async (req, res) => {
  try {
    const { email, trID } = req.body;
    const Time = new Date().toLocaleTimeString();
    const newPost = new TrIdModel({ email, Time, trID });
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});


app.get('/trid/data', (req, res) => {
  TrIdModel.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})

















const AmountSchema = new mongoose.Schema({
  amount : String,
  email : String,
  time: String
})

const AmountModel = mongoose.model('Amount_Fix', AmountSchema)


app.put('/amount/data/put/:email', async (req, res) => {
  const { email } = req.params;
  const { amount } = req.body;

  try {
    // Find the user by email
    const user = await AmountModel.findOne({ email });
    const time = new Date().toLocaleTimeString();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.amount = amount;
    user.time = time
    await user.save();

    res.status(200).json({ Status : "OK" });
  } catch (error) {
    console.error(error);
    res.status(205).json({ message: 'Internal Server Error' });
  }
});

app.get('/amount/dataLength', async (req, res) => {
  try {
    const dataLength = await AmountModel.countDocuments();
    
    res.json({ length: dataLength });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data length' });
  }
});


app.post('/amount/data/fix', async (req, res) => {
  try {
    const { amount , email } = req.body;
    const time = new Date().toLocaleTimeString();
    const newPost = new AmountModel({ amount,email ,time});
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});

app.get('/amount/data', async (req, res) => {
  AmountModel.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})

const GifWonDataSchema = new mongoose.Schema({
  gifno1 : String,
    gifname : String,
    gifdisc : String,
    gifimgurl: String,
    giftime : String,
    time : String,
    email1: String,
    rank: String
});

const GifWonDataModel = mongoose.model('Gif_won_Data', GifWonDataSchema);

app.get('/gif/won/data/:email1', async (req, res) => {
  try {
    const email1 = req.params.email1;
    const user = await GifWonDataModel.find({ email1 });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});

app.post('/check/won/data', async (req, res) => {
  const { email1 } = req.body;
  
  // Check if the email exists in the database
  const user = await GifWonDataModel.findOne({ email1 });

  if (user) {
    res.status(200).json({Status : 'OK'});
  } else {
    res.status(200).json({Status : 'None'});
  }
});

app.post('/gif/won/data', async (req, res) => {
  try {
    const { gifno1, gifname, gifdisc, gifimgurl, giftime,rank,email1 } = req.body;
    const time = new Date().toLocaleTimeString();
    const newPost = new GifWonDataModel({ gifno1, gifname, gifdisc, gifimgurl, giftime, rank, email1, time});
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});

const GifDataSchema = new mongoose.Schema({
  gifno : String,
  gifname : String,
  gifdisc : String,
  gifimgurl: String,
  giftime : String,
  time : String
});

const GifDataModel = mongoose.model('Gif_Data', GifDataSchema);

app.get('/all/gif/data', async (req, res) => {
  GifDataModel.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})

app.post('/gif/data', async (req, res) => {
  try {
    const { gifno, gifname, gifdisc, gifimgurl, giftime } = req.body;
    const time = new Date().toLocaleTimeString();
    const newPost = new GifDataModel({ gifno, gifname, gifdisc, gifimgurl, giftime, time});
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});


app.get('/gif/data/:gifno', async (req, res) => {
  try {
    const gifno = req.params.gifno;
    const user = await GifDataModel.find({ gifno });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



const AdmchatSchema = new mongoose.Schema({
  chat : String,
  time : String,
  email : String,
  usernm : String,
  role : String    
});

const AdmChatModel = mongoose.model('admin_Chat', AdmchatSchema)


app.get('/admchat/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await AdmChatModel.find({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});

app.get('/admchat1/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await AdmChatModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});

app.post('/admchat/post', async (req, res) => {
  try {
    const { email, chat,usernm, role } = req.body;
    const time = new Date().toLocaleTimeString();
    const newPost = new AdmChatModel({ email, time, chat ,usernm, role});
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});




const usechatSchema = new mongoose.Schema({
  chat : String,
  time : String,
  email : String,
  usernm : String,
  role : String    
});

const UserChatModel = mongoose.model('User_Chat', usechatSchema)

app.get('/chat/data', async (req, res) => {
  UserChatModel.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})

app.post('/userchat/post', async (req, res) => {
  try {
    const { email, chat,usernm, role } = req.body;
    const time = new Date().toLocaleTimeString();
    const newPost = new UserChatModel({ email, time, chat ,usernm, role});
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});


const PrizeSchema = new mongoose.Schema({
  email : String,
  total: String,
  time: String
    
});

const PrizeModel = mongoose.model('Total_Prizes', PrizeSchema)

app.get('/prize/data', async (req, res) => {
  PrizeModel.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})

app.post('/prizzzess', async (req, res) => {
  try {
    const { email, total } = req.body;
    const time = new Date().toLocaleTimeString();
    const newPost = new PrizeModel({ email, time, total });
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});



const winnnSchema = new mongoose.Schema({
  email : String,
  IP :String,
  Time : String,
  star : String,
  no : String,
  username : String,
  instaID : String
    
});

const WinnnModel = mongoose.model('Winnn', winnnSchema)

app.get('/winnn/data', async (req, res) => {
  WinnnModel.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})

app.get('/winnn/data/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await WinnnModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});

app.post('/winnn', async (req, res) => {
  try {
    const { email, IP, star, no, username, instaID } = req.body;
    const Time = new Date().toLocaleTimeString();
    const newPost = new WinnnModel({ email, Time, IP , star, no, username, instaID});
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});


app.get('/winnn/length', async (req, res) => {
  try {
    const dataLength = await WinnnModel.countDocuments();
    res.json({ dataLength });
  } catch (err) {
    console.error('Error:', err);
    res.status(205).json({ error: 'Server error' });
  }
});



const WonSchema = new mongoose.Schema({
  email : String,
  IP :String,
  Time : String
    
});

const WonModel = mongoose.model('Won', WonSchema)

app.post('/won/id/check', async (req, res) => {
  const { email } = req.body;
  
  // Check if the email exists in the database
  const user = await WonModel.findOne({ email });

  if (user) {
    res.status(200).json({Status : 'OK'});
  } else {
    res.status(210).json({Status : 'BAD'});
  }
});


app.get('/won/length', async (req, res) => {
  try {
    const dataLength = await WonModel.countDocuments();
    res.json({ dataLength });
  } catch (err) {
    console.error('Error:', err);
    res.status(205).json({ error: 'Server error' });
  }
});

app.post('/won/match', async (req, res) => {
  try {
    const { email, IP } = req.body;
    const Time = new Date().toLocaleTimeString();
    const newPost = new WonModel({ email, Time, IP });
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});




const UserinfoSchema = new mongoose.Schema({
  name : String,
  username :String,
  email : String,
  picture : String,
  role: {
    default : 'user',
    type : String
  }
})
const UserinfoModel = mongoose.model('User_info', UserinfoSchema)



app.post('/api/check/nme', async (req, res) => {
  const { email } = req.body;
  
  // Check if the name exists in the database
  const user = await UserinfoModel.findOne({ email });

  if (user) {
    res.status(200).json({Status : 'OK'});
  } else {
    res.status(200).json({Status : 'BAD'});
  }
});

app.get('/users/length', async (req, res) => {
  try {
    const dataLength = await UserinfoModel.countDocuments();
    res.json({ dataLength });
  } catch (err) {
    console.error('Error:', err);
    res.status(205).json({ error: 'Server error' });
  }
});


app.get('/user', async (req, res) => {
  UserinfoModel.find({})
  .then(datas => res.json(datas))
  .catch(err => res.json(err))
})



app.get('/user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserinfoModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});



app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;
  
  // Check if the email exists in the database
  const user = await UserinfoModel.findOne({ email });

  if (user) {
    res.status(200).json({Status : 'OK'});
  } else {
    res.status(200).json({Status : 'BAD'});
  }
});

app.post('/checkemail', async (req, res) => {
  const { email } = req.body;
  
  // Check if the email exists in the database
  const user = await UserphraseModel.findOne({ email });

  if (user) {
    res.status(200).json({Status : 'OK'});
  } else {
    res.status(200).json({Status : 'None'});
  }
});


app.post('/userinfo', async (req, res) => {
  try {
    const { name, username, email, picture} = req.body;
    const newPost = new UserinfoModel({ name, username, email, picture});
    await newPost.save();
    res.status(200).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});


app.put('/pass/put/:email', async (req, res) => {
    const { email } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Find the user by email
      const user = await UserinfoModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the new password
      const saltRounds = 10; // Number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ Status : "OK" });
    } catch (error) {
      console.error(error);
      res.status(205).json({ message: 'Internal Server Error' });
    }
  });


app.post('/google/loginn', (req, res) => {
  const {email} = req.body;
  const token = jwt.sign({email: email },            
    "jwt-secret-key", {expiresIn: '1d'})
    res.cookie('token', token)
    return res.json({Status: "OK"})

})

const IpSchema = new mongoose.Schema({
  ipaddr : String
})
const IpModel = mongoose.model('IP', IpSchema)



app.post('/ippost', (req, res) => {
  try{
    const ipaddr = req.body;
    bcrypt.hash(phr1, 10)
    .then(hash => {
      IpModel.create(ipaddr)
      res.status(200).json({Status : 'OK'});
    })
  } catch (error) {
    res.status(400).json({Status : 'BAD'});
  }

});








/* checking if answer valid or not */

app.post('/userdatata1', async (req, res) => {
  try{
    const {qno ,ipaddr, value1 } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      UserDataModel.create({qno ,ipaddr, value1 })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});

app.post('/userdatata2', async (req, res) => {
  try{
    const {qno ,ipaddr, value2 } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      UserDataModel.create({qno ,ipaddr, value2 })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});

app.post('/userdatata3', async (req, res) => {
  try{
    const {qno ,ipaddr, value3 } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      UserDataModel.create({qno ,ipaddr, value3 })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});

app.post('/userdatata4', async (req, res) => {
  try{
    const {qno ,ipaddr, value4 } = req.body;
    bcrypt.hash(answer, 10)
    .then(hash => {
      UserDataModel.create({qno ,ipaddr, value4 })
      res.status(200).json({message: 'Data Posted or Saved.'});
    })
  } catch (error) {
    res.status(400).json({ message: 'Error saving Data.' });
  }

});




const WaySchema = new mongoose.Schema({
  email : String,
  way : String,
  ip :String
})
const WayModel = mongoose.model('Way', WaySchema)




app.post('/select', async (req, res) => {
  try {
    const { email, way, ip } = req.body;
    const newPost = new WayModel({ email, way, ip });
    await newPost.save();
    res.status(201).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});

app.get('/way/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await WayModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});


app.post('/way/email', async (req, res) => {
  const { email } = req.body;
  
  // Check if the email exists in the database
  const user = await WayModel.findOne({ email });

  if (user) {
    res.status(200).json({Status : 'OK'});
  } else {
    res.status(200).json({Status : 'BAD'});
  }
});


app.use(useragent.express());

app.get('/check', (req, res) => {
  const userAgent = req.useragent;

  if (userAgent.isMobile) {
    res.json({ deviceType: 'Mobile' });
  } else if (userAgent.isDesktop) {
    res.json({ deviceType: 'PC' });
  } else {
    res.json({ deviceType: 'Unknown' });
  }
});





const Way1Schema = new mongoose.Schema({
  email : String,
    qno1 : {
        default : "false",
        type : String
    },
    qno2 : {
        default : "false",
        type : String
    },
    qno3: {
        default : "false",
        type : String
    },
    qno4 : {
        default : "false",
        type : String
    },
    qno5 : {
        default : "false",
        type : String
    },
    qno6 : {
        default : "false",
        type : String
    },
    qno7 : {
        default : "false",
        type : String
    },
    qno8 : {
        default : "false",
        type : String
    },
    qno9: {
        default : "false",
        type : String
    },
    qno10 : {
        default : "false",
        type : String
    },
    qno11 : {
      default : "Yess",
      type : String
  }
    
})
const Way01Model = mongoose.model('way01', Way1Schema)

app.post('/way01', async (req, res) => {
  try {
    const { email, qno1, qno2, qno3, qno4, qno5, qno6, qno7, qno8, qno9, qno10, qno11 } = req.body;
    const newPost = new Way01Model({ email, qno1, qno2, qno3, qno4, qno5, qno6, qno7, qno8, qno9, qno10, qno11 });
    await newPost.save();
    res.status(200).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});

app.get('/way01/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await Way01Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(205).json({ message: 'Internal server error' });
  }
});

app.put('/way01/put/:id', async (req, res) => {
  const id = req.params.id;
  const {qno1, qno2, qno3, qno4, qno5, qno6, qno7, qno8, qno9, qno10} = req.body;
  Way01Model.findByIdAndUpdate({_id : id }, {qno1, qno2, qno3, qno4, qno5, qno6, qno7, qno8, qno9, qno10})
  .then(res => res.status(200).json({ Status : "OK" }))
  .catch(err => res.json(err))
});




const EliminateSchema = new mongoose.Schema({
  email : String,
  way : String,
  qno : String,
  IP :String,
  Time : String
})
const EliModel = mongoose.model('eliminate', EliminateSchema)


app.post('/eleminate', async (req, res) => {
  try {
    const Time = new Date().toLocaleString();
    const { email, IP, way, qno } = req.body;
    const newPost = new EliModel({ email, IP, way, qno, Time });
    await newPost.save();
    res.status(200).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});










const LikeSchema = new mongoose.Schema({
  like : String,
  comments :String,
  time : String,
  name : String

})

const LikeModel = mongoose.model('Meti_data', LikeSchema);

app.post('/like/put/data', async (req, res) => {
  const { name } = req.body;
  
  // Check if the email exists in the database
  const user = await LikeModel.findOne({ name });

  if (user) {
    res.status(200).json({Status : 'OK'});
  } else {
    res.status(200).json({Status : 'None'});
  }
});

app.get('/like/dataLength', async (req, res) => {
  try {
    const dataLength = await LikeModel.countDocuments();
    res.json({ length: dataLength });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data length' });
  }
});

app.post('/like/data/meti', async (req, res) => {
  try {
    const Time = new Date().toLocaleString();
    const { like, name, comments, } = req.body;
    const newPost = new LikeModel({ like, name, comments, Time });
    await newPost.save();
    res.status(200).json({ Status : "OK", post: newPost });
  } catch (err) {
    res.status(205).json({ error: err.message });
  }
});











app.listen(port, () => {
    console.log(`Server Running on Port ${port} :`);
})