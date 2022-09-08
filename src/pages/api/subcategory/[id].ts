import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return changeSubcategory();
        case 'DELETE':
            return deleteSubcategory(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function changeSubcategory() {
        const { name, id } = req.body;

        if (!name) throw 'Порожня назва';

        if (name.length > 18) throw 'Назва не більше ніж 18 символів';

        const result = await prisma.subcategory.update({
            where: { id },
            data: { name }
        });

        return res.status(200).json(result);
    }

    async function deleteSubcategory(req, res) {
        const subcategoryId = req.query.id;
        const subcategory = await prisma.subcategory.delete({
            where: { id: subcategoryId }
        });
        res.json(subcategory);
    }
}