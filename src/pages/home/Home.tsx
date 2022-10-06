import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Link } from "@mui/material";

export default function SimpleAccordion() {
    return (
        <Container sx={{ overflowY: "auto", height: "85vh" }}>
            <Accordion disabled>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>Описание проекта</Typography>
                </AccordionSummary>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Основная концепция</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textIndent: 30 }}>
                        Приветствую вас на своем приложении "Калькулятор
                        налогов". Как следует из названия вы можете произвести
                        налоговые расчеты в соответствующих разделах.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Некоторые разделы, например, НДС или заработная плата
                        сохраняют всю вашу введенную информацию в конкретном
                        браузере конкретного компьютера, т.е. используется
                        браузерные средства хранения информации.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Иные разделы, такие как "Дивиденды", не сохраняют
                        информацию и просто производят рассчет отталкиваясь от
                        здесь и сейчас введенных значений.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Приложение не является подобием бухгалтерской системы. С
                        другой стороны некоторые расчеты требуют разного рода
                        пересечений вводимой информации, например, информация о
                        сотруднике необходима для начисления заработной платы.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>
                        Калькулятор налогов по заработной плате
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Расчет налогов с фонда оплаты труда реализован следующим
                        образом. В соответствующих месяцах заполняются данные по
                        сотрудникам и начисления по ним, производится расчет
                        страховых взносов и НДФЛ.
                    </Typography>
                    <Typography sx={{ textIndent: 30 }}>
                        Разбивка по месяцам необходима для контроля лимитов по
                        некоторым видам взносов.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Для расчета налогов с заработной платы следует переейти
                        на страницу нажав на "бургер" и выбрать "Начисления" в
                        разделе "Зарплата". Добавить новую строку в таблицу
                        нажав на большой плюсик. В первую очередь следует
                        создать/выбрать сотрудника нажав на ячейку (указатель
                        изменит форму). Правее будут располагаться две кнопки:
                        <br />
                        <ul>
                            <li>
                                1) создать/редактировать (контекстно), при
                                нажатии на которую откроется диалоговое окно
                            </li>
                            <li>2) добавить в таблицу</li>
                        </ul>
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        После выбора сотрудника станет доступен ввод сумм. После
                        ввода суммы необходимо нажать на кнопку рассчитать.
                        Нажатие на эту кнопку произведет перерасчет всех таблиц.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализован расчет налогов по ГПХ - необходимо поставить
                        соответствующую галочку.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализован учет вычетов по НДФЛ - необходимо ввести
                        количество детей.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализованы расчеты взносов по трем кодам тарифов:
                        <ul>
                            <li>код 01 - базовый</li>
                            <li>код 06 - для аккредитованных IT - компаний</li>
                            <li>код 20 - для малого бизнеса</li>
                        </ul>
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        При изменении тарифа страховых взносо пересчет будет
                        произведен автоматически по всех таблицах.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализован отчет по сотруднику доступный на странице
                        "Сотрудники". Там же можно увидеть применяемые ставки
                        налогов и лимиты начислений.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализована сортировка по всем столбцам. Стрелочка в
                        шапке таблицы указыает на порядок сортировки.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Для ускорения процесса заполенния таблицы реализовано
                        заполенине текущего месяца на основе предыдущего путем
                        нажатия кнопки "Заполнить". Если месяц январь или в
                        предыдущем месяце данных нет, то функция не сработает.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>
                        Калькулятор налога на добавленную стоимость
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textIndent: 30 }}>
                        Расчет НДС реализован через ввод ключевых данных
                        накладной/счета-фактуры/УПД. Заполняются соответствующие
                        таблицы и путем расчета итоговых данных по каждой
                        таблице получаем сумму НДС к уплате.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Для расчета НДС следует переейти на страницу нажав на
                        "бургер" и выбрать "НДС". Добавить новую строку в
                        таблицу нажав на большой плюсик. Практически все поля
                        являются редактируемыми. При вводе суммы по накладной
                        НДС пересчитывается автоматически.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализован выбор ставок НДС: 0%, 10%, 20%. В случае если
                        в документе к разным позициям применяются разные
                        налоговые ставки, то пользователь может отредактировать
                        сумму НДС вручную, и тогда ставка НДС пример значение
                        "mix".
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализована сортировка по необходимым колонкам - просто
                        нажимаете на название колонки. Стрелочка укажет порядок
                        сортировки.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализован механизм фильтрации по контрагенту, дате и
                        сумме.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Калькулятор дивидендов</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textIndent: 30 }}>
                        Реализован калькулятор дивидендов. Здесь все просто -
                        вводите сумму и получаете НДФЛ к уплате. Предумотрено
                        два варианта рассчета - по начислению и по выплате.
                        Расчет не привязывается к конкретном сотруднику и в
                        финальный отчет не попадает.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Страница Сотрудники</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textIndent: 30 }}>
                        Позволяет вывести информацию о сотруднике, добавить,
                        изменить, удалить. Также на странице доступен подробный
                        годовой отчет по начислениям сотрудника.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Дополнительные возможности</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textIndent: 30 }}>
                        Реализованы светлая и темная темы приложения - темная по
                        умолчанию.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализованы всплывающие уведомления, которые можно
                        отключить.
                    </Typography>
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Реализованы различные валидации ввода, которые будут
                        дополняться. Например вы не сможете ввести буквы там где
                        предусмотрены цифры. Реализованы минимальные "шаги" для
                        цифрового ввода. Запрет ввода отрицательных значений и
                        др.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Технические ограничения</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textIndent: 30 }}>
                        Обязательно запускайте приложение со стартовой страницы
                        по{" "}
                        <Link
                            href="https://kamik0t0.github.io/tax-calculator/"
                            color="primary"
                            target="_blank"
                        >
                            ссылке.
                        </Link>{" "}
                        Если вы попытаетесь стартануть с конкретной страницы
                        (например, https://kamik0t0.github.io/nds), то возникнет
                        ошибка.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>ВАЖНО!!!</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textIndent: 30 }}>
                        Реальный расчет налогов требует учета огромного
                        количество факторов, особенностей ставок и
                        законодательства в конкретном регионе. В моем проекте
                        реализованы самые общие случаи и не стоит полагаться на
                        полученные данные как на реальные расчеты, но, тем не
                        менее, в большинстве случаев они помогут предпринимателю
                        в случае, например, планирования, контроля и
                        собственного учета.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}
