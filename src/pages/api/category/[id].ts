import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return changeCategory();
        case 'DELETE':
            return deleteCategory(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function changeCategory() {
        const { name, id } = req.body;

        if (!name) throw 'Порожня назва';

        if (name.length > 18) throw 'Назва не більше ніж 18 символів';

        const result = await prisma.category.update({
            where: { id },
            data: { name }
        });

        return res.status(200).json(result);
    }

    async function deleteCategory(req, res) {
        const categoryId = req.query.id;
        const category = await prisma.category.delete({
            where: { id: categoryId }
        });
        res.json(category);
    }
}