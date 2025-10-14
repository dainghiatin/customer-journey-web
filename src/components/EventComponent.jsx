import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data cho events
const mockEvents = [
    { id: 1, title: "SỰ KIỆN 1", subtitle: "(EVENT 1)", description: "Mô tả sự kiện 1" },
    { id: 2, title: "SỰ KIỆN 2", subtitle: "(EVENT 2)", description: "Mô tả sự kiện 2" },
    { id: 3, title: "SỰ KIỆN 3", subtitle: "(EVENT 3)", description: "Mô tả sự kiện 3" },
    { id: 4, title: "SỰ KIỆN 4", subtitle: "(EVENT 4)", description: "Mô tả sự kiện 4" },
    { id: 5, title: "SỰ KIỆN 5", subtitle: "(EVENT 5)", description: "Mô tả sự kiện 5" },
    { id: 6, title: "SỰ KIỆN 6", subtitle: "(EVENT 6)", description: "Mô tả sự kiện 6" },
    { id: 7, title: "SỰ KIỆN 7", subtitle: "(EVENT 7)", description: "Mô tả sự kiện 7" },
    { id: 8, title: "SỰ KIỆN 8", subtitle: "(EVENT 8)", description: "Mô tả sự kiện 8" },
    { id: 9, title: "SỰ KIỆN 9", subtitle: "(EVENT 9)", description: "Mô tả sự kiện 9" },
    { id: 10, title: "SỰ KIỆN 10", subtitle: "(EVENT 10)", description: "Mô tả sự kiện 10" },
    { id: 11, title: "SỰ KIỆN 11", subtitle: "(EVENT 11)", description: "Mô tả sự kiện 11" },
    { id: 12, title: "SỰ KIỆN 12", subtitle: "(EVENT 12)", description: "Mô tả sự kiện 12" },
    { id: 13, title: "SỰ KIỆN 13", subtitle: "(EVENT 13)", description: "Mô tả sự kiện 13" },
    { id: 14, title: "SỰ KIỆN 14", subtitle: "(EVENT 14)", description: "Mô tả sự kiện 14" },
    { id: 15, title: "SỰ KIỆN 15", subtitle: "(EVENT 15)", description: "Mô tả sự kiện 15" },
    { id: 16, title: "SỰ KIỆN 16", subtitle: "(EVENT 16)", description: "Mô tả sự kiện 16" },
    { id: 17, title: "SỰ KIỆN 17", subtitle: "(EVENT 17)", description: "Mô tả sự kiện 17" },
    { id: 18, title: "SỰ KIỆN 18", subtitle: "(EVENT 18)", description: "Mô tả sự kiện 18" },
];

export default function EventComponent() {
    // Trang hiện tại cho desktop và mobile (mỗi swipe -> sang trang mới)
    const [pageDesktop, setPageDesktop] = useState(0);
    const [pageMobile, setPageMobile] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(null);
    const [dragLastX, setDragLastX] = useState(null);
    const navigate = useNavigate();
    
    // Desktop: hiển thị 6 cột x 2 dòng = 12 events
    // Mobile: hiển thị 2 cột x 2 dòng = 4 events
    // Thứ tự: dòng 1 (1,3,5,7,9,11), dòng 2 (2,4,6,8,10,12)
    const columnsDesktop = 6;
    const columnsMobile = 2;
    
    const getCurrentEvents = (isMobile = false) => {
        const columns = isMobile ? columnsMobile : columnsDesktop;
        const page = isMobile ? pageMobile : pageDesktop;
        const startColumnIndex = page * columns; // mỗi trang chứa đúng số cột
        const events = [];
        
        // Tạo grid đúng thứ tự: dòng trên (1,3,5...), dòng dưới (2,4,6...)
        // Dòng 1: events có index lẻ (0,2,4,6,8,10...)
        for (let col = 0; col < columns; col++) {
            const eventIndex = (startColumnIndex + col) * 2; // 0,2,4,6,8,10...
            if (eventIndex < mockEvents.length) {
                events.push(mockEvents[eventIndex]);
            }
        }
        
        // Dòng 2: events có index chẵn (1,3,5,7,9,11...)
        for (let col = 0; col < columns; col++) {
            const eventIndex = (startColumnIndex + col) * 2 + 1; // 1,3,5,7,9,11...
            if (eventIndex < mockEvents.length) {
                events.push(mockEvents[eventIndex]);
            }
        }
        
        return events;
    };
    
    const getMaxPages = (isMobile = false) => {
        const columns = isMobile ? columnsMobile : columnsDesktop;
        const maxColumns = Math.ceil(mockEvents.length / 2); // mỗi cột = 2 events
        return Math.max(1, Math.ceil(maxColumns / columns));
    };

    const handlePrevious = (isMobile = false) => {
        if (isMobile) {
            setPageMobile(prev => Math.max(0, prev - 1));
        } else {
            setPageDesktop(prev => Math.max(0, prev - 1));
        }
    };
    
    const handleNext = (isMobile = false) => {
        const maxPages = getMaxPages(isMobile);
        if (isMobile) {
            setPageMobile(prev => Math.min(maxPages - 1, prev + 1));
        } else {
            setPageDesktop(prev => Math.min(maxPages - 1, prev + 1));
        }
    };
    
    const canGoPreviousDesktop = pageDesktop > 0;
    const canGoNextDesktop = pageDesktop < getMaxPages(false) - 1;
    const canGoPreviousMobile = pageMobile > 0;
    const canGoNextMobile = pageMobile < getMaxPages(true) - 1;

    const swipeThreshold = 50; // px

    const onPointerDown = (clientX) => {
        setIsDragging(true);
        setDragStartX(clientX);
        setDragLastX(clientX);
    };

    const onPointerMove = (clientX) => {
        if (!isDragging || dragStartX === null) return;
        setDragLastX(clientX);
    };

    const onPointerUp = (isMobile = false) => {
        if (!isDragging || dragStartX === null || dragLastX === null) {
            setIsDragging(false);
            setDragStartX(null);
            setDragLastX(null);
            return;
        }
        const deltaX = dragLastX - dragStartX;
        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX < 0) {
                const canGoNext = isMobile ? canGoNextMobile : canGoNextDesktop;
                if (canGoNext) handleNext(isMobile);
            } else if (deltaX > 0) {
                const canGoPrevious = isMobile ? canGoPreviousMobile : canGoPreviousDesktop;
                if (canGoPrevious) handlePrevious(isMobile);
            }
        }
        setIsDragging(false);
        setDragStartX(null);
        setDragLastX(null);
    };

    const EventCard = ({ event }) => (
        <div onClick={() => navigate(`/list-of-goods/${event.id}`)} style={{ 
            backgroundColor: "white", 
            aspectRatio: 3 / 4, 
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid black',
            cursor: 'pointer'
        }}>
            <h3 style={{ margin: '5px 0', fontSize: '16px' }}>{event.title}</h3>
            <h4 style={{ margin: '5px 0', fontSize: '14px' }}><em>{event.subtitle}</em></h4>
            <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>{event.description}</p>
        </div>
    );

    const NavigationButton = ({ direction, onClick, disabled, isMobile = false }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                background: disabled ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: isMobile ? '40px' : '50px',
                height: isMobile ? '40px' : '50px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '16px' : '20px',
                zIndex: 10
            }}
        >
            {direction === 'prev' ? '←' : '→'}
        </button>
    );

    return (
        <section className="action-section " >
            {/* Desktop Layout */}
            <div className="action-section-1" style={{ 
                alignItems: 'center',
                gap: 10,
                position: 'relative'
            }}>
                <NavigationButton 
                    direction="prev" 
                    onClick={() => handlePrevious(false)}
                    disabled={!canGoPreviousDesktop}
                />
                
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gap: '10px',
                        flex: 1,
                        padding: '0 10px',
                        userSelect: 'none'
                    }}
                    onMouseDown={(e) => onPointerDown(e.clientX)}
                    onMouseMove={(e) => onPointerMove(e.clientX)}
                    onMouseUp={() => onPointerUp(false)}
                    onMouseLeave={() => onPointerUp(false)}
                    onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
                    onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
                    onTouchEnd={() => onPointerUp(false)}
                >
                    {getCurrentEvents(false).map((event, index) => (
                        <EventCard key={`${event.id}-${index}`} event={event} />
                    ))}
                </div>
                
                <NavigationButton 
                    direction="next" 
                    onClick={() => handleNext(false)}
                    disabled={!canGoNextDesktop}
                />
            </div>

            {/* Mobile Layout */}
            <div className="action-section-1-mobile" style={{ 
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                position: 'relative'
            }}>
                <NavigationButton 
                    direction="prev" 
                    onClick={() => handlePrevious(true)}
                    disabled={!canGoPreviousMobile}
                    isMobile={true}
                />
                
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gap: '10px',
                        flex: 1,
                        padding: '0 10px',
                        userSelect: 'none'
                    }}
                    onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
                    onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
                    onTouchEnd={() => onPointerUp(true)}
                >
                    {getCurrentEvents(true).map((event, index) => (
                        <EventCard key={`${event.id}-${index}`} event={event} />
                    ))}
                </div>
                
                <NavigationButton 
                    direction="next" 
                    onClick={() => handleNext(true)}
                    disabled={!canGoNextMobile}
                    isMobile={true}
                />
            </div>
        </section>
    )
}