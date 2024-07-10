import winston, { format, transports } from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(
            (info) => `${info.timestamp}, ${info.level}, ${info.message},`
        )
    ),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
        }),
        // new winston.transports.File({ filename: 'combined.log' }),
    ],
})
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`
                )
            ),
            level: 'debug',
        })
    )
}

export default logger
