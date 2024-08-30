import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(1).max(50).default('ゲスト'),
	body: z.string().min(1).max(200)
});
