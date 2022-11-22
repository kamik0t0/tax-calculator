import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container, Link, useTheme } from "@mui/material";
import PolyButton from "@sharedcomponents/PolyButton";

export default function SimpleAccordion() {
    const theme = useTheme();
    const headersTextColor =
        theme.palette.mode === "dark" ? { color: "snow" } : { color: "black" };

    return (
        <Container sx={{ overflowY: "auto", height: "85vh" }}>
            <Accordion disabled>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant="h6" sx={headersTextColor}>
                        Описание проекта
                    </Typography>
                </AccordionSummary>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h6" sx={headersTextColor}>
                        Основная концепция
                    </Typography>
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
                        Иные разделы, такие как "Дивиденды", "Пени", "Налоги",
                        не сохраняют информацию и просто производят рассчет
                        отталкиваясь от введенных значений.
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
                    <Typography variant="h6" sx={headersTextColor}>
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
                    <Typography variant="h6" sx={headersTextColor}>
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
                    <Typography variant="h6" sx={headersTextColor}>
                        Калькулятор дивидендов
                    </Typography>
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
                    <Typography variant="h6" sx={headersTextColor}>
                        Сотрудники
                    </Typography>
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
                    <Typography variant="h6" sx={headersTextColor}>
                        Сравнение режимов налогообложения (калькулятор)
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ textIndent: 30 }}>
                        Калькулятор налогов в первую очередь предназначен для
                        сравнения налоговой нагрузки при применении разных
                        режимов налогообложения исходя из одинаковых входных
                        данных. Экономические субъекты могут заниматься
                        деятельностью которая предполагает уплату дополнительных
                        налогов таких как акцизы, налог на добычу полезных
                        ископаемых и многое другое из того что калькулятор не
                        учитывает. Поэтому не стоит полагаться на расчеты
                        выдаваемые калькулятором как точно соответствующие тем
                        условиям в которых хозяйствующий субъект осуществляете
                        свою деятельность.
                        <br />
                        <br />
                        Для расчета нужно заполнить соответствующие поля, нажать
                        кнопку "РАССЧИТАТЬ". В таблице справа можно сформировть
                        отчет кликнув по сумме. Также можно поменять ставки
                        налогов нажав на кнопку "СТАВКИ". Кнопка "ЗАПОЛНИТЬ"
                        автоматически подставит значения из разделов НДС и
                        Зарплата.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h6" sx={headersTextColor}>
                        Калькулятор пеней
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Расчет пеней осуществляется по правилам, установленным{" "}
                        <PolyButton
                            href="https://nkrfkod.ru/statja-75/"
                            color="primary"
                            target="_blank"
                            as={Link}
                        >
                            статьей 75 Налогового кодекса
                        </PolyButton>{" "}
                        по формуле:
                        <br />
                        ПЕНИ = СУММА х ДНИ х СТАВКА / 300
                        <br />
                        С 01.10.2017 для юридических лиц с просрочкой более 30
                        дней, расчёт по формуле:
                        <br />
                        ПЕНИ = СУММА х 30 х СТАВКА / 300 + СУММА х (ДНИ - 30) х
                        СТАВКА/150
                        <br />
                        СУММА — сумма задолженности;
                        <br />
                        ДНИ — количество дней просрочки;
                        <br />
                        СТАВКА —{" "}
                        <PolyButton
                            href="https://normativ.kontur.ru/rates/refinance?from=peni"
                            color="primary"
                            target="_blank"
                            as={Link}
                        >
                            процентная ставка рефинансирования ЦБ РФ
                        </PolyButton>
                        , действующая в период просрочки (c 01.01.2016
                        приравнена к значению{" "}
                        <PolyButton
                            href="https://normativ.kontur.ru/rates/cbrkey?from=peni"
                            color="primary"
                            target="_blank"
                            as={Link}
                        >
                            ключевой ставки
                        </PolyButton>{" "}
                        ЦБ РФ)
                        <br />
                        <PolyButton
                            href="https://normativ.kontur.ru/document?moduleId=51&documentId=4885&from=peni"
                            color="primary"
                            target="_blank"
                            as={Link}
                        >
                            Как рассчитать пени по налогам, сборам и взносам
                        </PolyButton>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h6" sx={headersTextColor}>
                        Дополнительные возможности
                    </Typography>
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
                    <br />
                    <Typography sx={{ textIndent: 30 }}>
                        Вы можете заходить на интересующую вас странцу по прямой
                        ссылке, например{" "}
                        <PolyButton
                            href="https://kamik0t0.github.io/tax-calculator/calculator"
                            color="primary"
                            target="_blank"
                            as={Link}
                        >
                            https://kamik0t0.github.io/tax-calculator/calculator
                        </PolyButton>
                        . Это важно поскольку существуют некоторые ограничения
                        при хостинге приложений реализующих конецепциею SPA
                        (Single Page Application).
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h6" sx={headersTextColor}>
                        ВАЖНО!!!
                    </Typography>
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
