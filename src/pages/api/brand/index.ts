import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return createBrand();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createBrand() {
        const { name } = req.body;

        if (!name) throw 'Порожня назва';

        if (name.length > 18) throw 'Назва не більше ніж 18 символів';

        const result = await prisma.brand.create({
            data: {
                name
            }
        });

        return res.status(200).json(result);
    }
}