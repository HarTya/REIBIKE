import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return changeProduct();
        case 'DELETE':
            return deleteProduct(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function changeProduct() {
        const { id, image, name, price, description, available, categoryId, subcategoryId, brandId } = req.body;

        if (!image) throw 'Оберіть картинку';

        if (!name) throw 'Порожня назва';
        if (name.length < 20) throw 'Назва не менше ніж 20 символів';
        if (name.length > 50) throw 'Назва не більше ніж 50 символів';

        if (!price) throw 'Порожня ціна';

        const priceNum = Number(price);
        if (priceNum > 9999999) throw 'Ціна не більше ніж 7 символів';

        if (!description) throw 'Порожній опис';

        if (!categoryId) throw 'Оберіть категорію';
        if (!subcategoryId) throw 'Оберіть подкатегорію';
        if (!brandId) throw 'Оберіть бренд';

        const result = await prisma.product.update({
            where: { id },
            data: {
                image,
                name,
                price: priceNum,
                description,
                available,
                categoryId,
                subcategoryId,
                brandId
            }
        });

        return res.status(200).json(result);
    }

    async function deleteProduct(req, res) {
        const productdId = req.query.id;
        const product = await prisma.product.delete({
            where: { id: productdId }
        });
        res.json(product);
    }
}