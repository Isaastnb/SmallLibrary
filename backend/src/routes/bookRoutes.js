const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.post('/', async (req,res) => {
    try {
        const { title, author } = req.body;
        await Book.create({ title, author });
        res.status(201).json({ message: 'Livro adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req,res)=> {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params;

        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Livro removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.put('/:id/lend', async (req,res) => {
    try {
        const { id } = req.params;
        const { borrowerName } = req.body;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        if (book.status !== "available") {
            return res.status(400).json({ message: 'Livro não disponível' });
        }

        book.borrowerName = borrowerName;
        book.status = 'lent';
        await book.save();

        res.status(200).json({ message: 'Livro emprestado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id/return', async (req,res) => {
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado'});
        }
        book.status = 'available';
        book.borrowerName = null
        await book.save();

        return res.status(200).json({message: 'Livro devolvido com sucesso!'})

    } catch (error) {
        res.status(500).json({ message: 'Erro ao devolver o livro'});
    }
});


module.exports = router;