// Скролл хедера
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// Canvas фон
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let dots = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dots = [];
    const count = Math.min(80, Math.floor(window.innerWidth / 25));
    for (let i = 0; i < count; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 1,
            speed: Math.random() * 0.4 + 0.1,
        });
    }
}

function drawCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a2540';
    dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
        dot.y -= dot.speed;
        if (dot.y < -10) dot.y = canvas.height + 10;
    });
    requestAnimationFrame(drawCanvas);
}

window.addEventListener('resize', () => initCanvas());
initCanvas();
drawCanvas();

// База задач для навыков
const tasksDB = {
    project_mgmt: {
        name: "Управление проектами (Waterfall/Agile)",
        tasks: [
            "Руководил командой из 15 человек при запуске финтех-платформы — экономия 20% бюджета.",
            "Внедрил Scrum, что повысило скорость релизов на 35%.",
            "Разработал Roadmap для стартапа, который привлёк $2M инвестиций."
        ]
    },
    business_analytics: {
        name: "Бизнес-аналитика и сбор требований",
        tasks: [
            "Провёл аудит розничной сети, увеличил выручку на 18% за полгода.",
            "Создал ТЗ для CRM-системы, внедрённой в 50+ магазинах.",
            "Собрал требования для логистического стартапа, сократил издержки на 22%."
        ]
    },
    negotiations: {
        name: "Коммерческие переговоры и продажи B2B",
        tasks: [
            "Заключил контракт с федеральным ритейлером на 85 млн ₽.",
            "Провёл переговоры с китайскими поставщиками, снизил цены на 15%.",
            "Обучил команду продаж, конверсия выросла с 12% до 27%."
        ]
    },
    finance_modeling: {
        name: "Финансовое моделирование и юнит-экономика",
        tasks: [
            "Построил юнит-экономику для EdTech-проекта — вышли на прибыль через 6 месяцев.",
            "Разработал DCF-модель для IT-компании, привлёк $1.5M.",
            "Внедрил план-факт анализ, спас от убытков 3 бизнес-юнита."
        ]
    },
    strategic_marketing: {
        name: "Стратегический маркетинг и вывод продуктов",
        tasks: [
            "Вывел B2B-сервис на рынок, захватил 8% доли за 9 месяцев.",
            "Разработал go-to-market стратегию для SaaS, окупили за 11 месяцев.",
            "Провёл ребрендинг, рост узнаваемости +40%."
        ]
    },
    leadership: {
        name: "Лидерство и управление командами",
        tasks: [
            "Построил департамент аналитики с нуля, вырастил 12 специалистов.",
            "Снизил текучку с 30% до 8% за год через систему менторинга.",
            "Управлял командой из 22 человек в 3 часовых поясах."
        ]
    }
};

// Модальное окно
const modal = document.getElementById('taskModal');
const closeBtn = document.querySelector('.close-modal');
const modalSkillName = document.getElementById('modalSkillName');
const modalTaskList = document.getElementById('modalTaskList');

function openModal(skillId) {
    const skill = tasksDB[skillId];
    if (!skill) return;
    modalSkillName.textContent = skill.name;
    modalTaskList.innerHTML = '';
    skill.tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        modalTaskList.appendChild(li);
    });
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (closeBtn) closeBtn.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFunc();
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModalFunc();
});

// Навешиваем обработчики на навыки
document.querySelectorAll('.skill-item').forEach(el => {
    const skillId = el.getAttribute('data-skill-id');
    if (skillId && tasksDB[skillId]) {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(skillId);
        });
    }
});

// Принудительно показываем все секции (на случай, если что-то скрыто)
document.querySelectorAll('section').forEach(section => {
    section.style.display = 'block';
});