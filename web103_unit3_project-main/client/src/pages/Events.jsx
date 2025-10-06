import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        // 这里应该添加获取所有事件的逻辑
        // 由于没有看到EventsAPI的实现，暂时留空
        // 实际项目中应该替换为真实的API调用
    }, [])

    return (
        <div className='all-events'>
            <header>
                <h2>All Events</h2>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default Events