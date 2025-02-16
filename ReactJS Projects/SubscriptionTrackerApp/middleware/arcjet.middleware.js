import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req,res,next) => {
    try {
        const decision = await aj.protect(req,{requested:1});

        if(decision.isDenied())
        {
            if(decision.reason.isRateLimit()) return res.status(429).json({error: 'Rate Limit Reached'});
            if(decision.reason.isBot()) return res.status(403).json({error: 'BOT detected'});

            return res.status(403).json({error: 'Access denied'});
        }

        next();
    }

    catch(error)
    {
        console.log(`Arcjet middleware Error: ${error}`);
    }

 }

 export default arcjetMiddleware;
