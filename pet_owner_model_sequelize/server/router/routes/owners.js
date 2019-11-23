module.exports = (app, db)=>{

    // get all owners
    app.get('/owners', (req,res)=>{
        db.owners.findAll()
        .then(owners => {
            res.json(owners);
        })
    });

    // get one owner by id
    app.get('/owner/:id',(req,res)=>{
        db.owners.find({
            where: { id: id}
        })
        .then(owner => {
            res.json(owner);
        })
    });

    // post single owner
    app.post('/owner',(req,res)=>{
        const name = req.body.name;
        const role = req.body.role;
        db.owners.create({
            name: name,
            role: role
        })
        .then(newOwner => {
            res.json(newOwner);
        })
    })

    // patch single owner
    app.patch('/owner/:id',(req,res) => {
        const id = req.params.id;
        const updates = req.body.updates;
        db.owners.find({
            where: {id: id}
        })
            .then(owner => {
                return owner.updateAttributes(updates)
            })
            .then(updatedOwner => {
                res.json(updatedOwner);
            })
    })

    // delete single owner
    app.delete('/owner/:id',(req,res) => {
        const id = req.params.id;
        db.owners.destroy({
            where: {id: id}
        })
            .then(deletedOwner => {
                res.json(deletedOwner);
            });
    });

};