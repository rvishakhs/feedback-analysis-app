import { db } from "~/server/db";

export async function checkAndUpdateQuota(
    userId: string,
    deductedQuota: boolean = true,
): Promise<boolean> {
    const quota = await db.apiQuota.findUnique({
        where: {
            userId
        } 
    })

    if (quota) {
        const timeNow = new Date();
        const lastreset = new Date(quota?.lastResetDate);
        const daysSinceLastReset = (timeNow.getTime() - lastreset.getTime()) / (1000 * 60 * 60 *24);

        if (daysSinceLastReset >= 30) {
            if (deductedQuota) {
                await db.apiQuota.update({
                    where: {userId},
                    data: {
                        lastResetDate : timeNow,
                        requestsUsed: 1,
                    }
                }) 
            }
            return true;
        }

        // Check if the user has enough quota
        if(quota.requestsUsed >= quota.maxRequests) {
            return false;
        }

        if (deductedQuota) {
            await db.apiQuota.update({
                where: {userId},
                data: {
                    requestsUsed: quota.requestsUsed + 1,
                }
            })
        }

    }
    
    return true;

}