const slugify = require('slugify');
const db = require('../../database/db.config');
const Post = db.posts;

//creation
exports.create=(req,res)=>{
  const{cadre,roue,pedale,guidon,vises,temps}= req.body;
  if(!cadre ||!roue ||!pedale||!guidon||!vises||!temps) {
    return res.status(400).send({
        message : 'content can not be empty'
    })
  }

const slug = slugify(cadre, '_');
const newPost = new Post({
    cadre: cadre,
    roue: roue,
    pedale: pedale,
    guidon: guidon,
    vises: vises,
    temps:temps
});
newPost.save(newPost).then((data)=>{
    res.status(200).send({
        message: 'successufully created post'
    })
}).catch(err=>{
    console.log(err);
})

};


//find all 
exports.findAll = (req, res)=>{
    Post.find({

    }).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
}




//suppression 
exports.delete = (req,res)=>{
    const id = req.params.id;
    if(!id){
        res.status(400).send({ message:"content is required"});
    }
    Post.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message: "Post not found"});
        }
        res.status(200).send({message:"Post was successfull deleted"});
    })
}

//consultation par l'id
exports.findOne = (req, res)=>{
    const id = req.params.id;
if (!id){
    res.status(400).send({message :"content is required"});
}
Post.findById(id).then((data) =>{
    res.send(data);
}).catch((err)=> {
    console.log(err);
});
}


//modification
exports.update = (req, res) => {
    const id = req.params.id;
    const { cadre, roue, pedale, guidon, vises, temps } = req.body;
    if (!id || !cadre || !roue || !pedale || !guidon || !vises || !temps) {
        res.status(400).send({ message: "All fields are required" });
    } else {
        Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: `Cannot update Post with id=${id}` });
                }
                res.status(200).send({ message: `Post was successfully updated` });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "Error updating post" });
            });
    }
};


   /* exports.findCadres = (req, res) => {
                Post.find({}, 'cadre')
                    .then(data => {
                        const cadres = data.map(item => item.cadre);
                        res.status(200).send(cadres);
                    })
                    .catch(err => {
                        console.error('Error finding cadres:', err);
                        res.status(500).send({ message: 'An error occurred while retrieving cadres.' });
                    });
            };*/



