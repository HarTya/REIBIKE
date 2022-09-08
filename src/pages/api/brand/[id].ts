import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return changeBrand();
        case 'DELETE':
            return deleteBrand(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function changeBrand() {
        const { name, id } = req.body;

        if (!name) throw 'Порожня назва';

        if (name.length > 18) throw 'Назва не більше ніж 18 символів';

        const result = await prisma.brand.update({
            where: { id },
            data: { name }
        });

        return res.status(200).json(result);
    }

    async function deleteBrand(req, res) {
        const brandId = req.query.id;
        const brand = await prisma.brand.delete({
            where: { id: brandId }
        });
        res.json(brand);
    }
}