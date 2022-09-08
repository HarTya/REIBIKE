import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return changeCharacteristic();
        case 'DELETE':
            return deleteCharacteristic(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function changeCharacteristic() {
        const { title, content, id } = req.body;

        if (!title) throw 'Порожня назва';
        if (title.length > 25) throw 'Назва не більше ніж 25 символів';

        if (!content) throw 'Порожній опис';

        const result = await prisma.characteristic.update({
            where: { id },
            data: { title, content }
        });

        return res.status(200).json(result);
    }

    async function deleteCharacteristic(req, res) {
        const characteristicId = req.query.id;
        const characteristic = await prisma.characteristic.delete({
            where: { id: characteristicId }
        });
        res.json(characteristic);
    }
}