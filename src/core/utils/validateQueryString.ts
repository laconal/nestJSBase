import { BadRequestException } from "@nestjs/common";

export async function validateQueryString(data: string) {
    const ids = data.split(',').map(s => s.trim());
    
    if (!ids.length || ids.some(v => v.length === 0)) {
    throw new Error('Invalid ids format');
    }
    
    for (const id of ids) {
    if (!/^[1-9]\d*$/.test(id)) {
        throw new BadRequestException();
    }
    }
    
    return ids.map(Number);
}
