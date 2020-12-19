import multer from 'fastify-multer';
import path from 'path';
import { MainRoute } from '@/server/config/path';

/*
:--------------------------------------------------------------------------
: @multer handler
:--------------------------------------------------------------------------
*/

type TMulterDefault = typeof multer.default;

export const IOMulter: TMulterDefault = multer.default;

export function diskStorage({
    filepath = 'uploads',
    control = Date.now(),
    folder = MainRoute.get('public').filepath,
}): any {
    return IOMulter.diskStorage({
        destination: function (request, file, callback) {
            callback(null, path.join(folder, filepath));
        },
        filename: function (request, file, callback) {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            callback(null, `${name}-${control}${ext}`);
        },
    });
}
