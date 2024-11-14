import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
const port = process.env.PORT
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('poggers')
})

app.get('/dados', (req, res) => {
 res.send('foggers')
})

app.post('/barbershops', async (req, res) => {
  cosnt {name, address, phone, email, active, employee_limit } = req.body;
  try {
    const newBarbershop = await prisma.barbershop.create({
      data: {
        name,
        address,
        phone,
        email,
        active,
        employee_limit
      },
    });

    res.json({ message: 'barbearia criada com sucesso', newBarbershop });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar barbearia', error
    })
  }
});

app.get('/barbershop' async (req, res) => {
  try {
  const barbershop = await prisma.barbershop.findMany();
 res.json(barbershops);
  } catch (error) {
 res.status(500).json({ message: 'Erro ao buscar barbearias', error });
  }
  })

app.get('/barbershops/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const barbershop = await prisma.barbershop.findUnique({ where: { id: parseInt(id) } });
    if (barbershop) {
      res.json(barbershop);
    } else {
      res.status(404).json({ message: 'Barbearia não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar barbearia', error });
  }
});

app.put('/barbershops/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email, active, employee_limit } = req.body;
  try {
    const updatedBarbershop = await prisma.barbershop.update({
      where: { id: parseInt(id) },
      data: {
        name,
        address,
        phone,
        email,
        active,
        employee_limit
      },
    });
    res.json({ message: 'Barbearia atualizada com sucesso', updatedBarbershop });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar barbearia', error });
  }
});

app.delete('/barbershops/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBarbershop = await prisma.barbershop.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Barbearia removida com sucesso', deletedBarbershop });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover barbearia', error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/json', (req, res) => {
const dados  = req.body
console.log (dados.nome)
res.json({ message: 'lumbertycoon', dados })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
