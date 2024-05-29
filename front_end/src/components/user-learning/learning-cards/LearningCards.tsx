import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, NotebookPen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SentencesExampleBox from "@/components/flash-card/SentencesExampleBox";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isFunction, replacePathWithId } from "@/lib/utils";
import { routerPaths } from "@/routes/path";
import { Progress } from "@/components/ui/progress"
import FlipCard from '@/components/flash-card/FlipCard';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Constants from '@/lib/Constants';
import { useNavigate } from 'react-router-dom';
const LearningCards = (props: any) => {
    const { data, progress, id, onFlip, showTest, testLevel } = props;
    const [currentCard, setCurrentCard] = useState(0);
    const showCard = (index: number) => {
        if (index >= data?.cards?.length || index < 0) {
            return;
        }
        setCurrentCard(index);
    }
    const navigate = useNavigate();
    return (
        <div>
            <Card className="w-full min-h-[500px] flex flex-col justify-between bg-transparent border-none !shadow-none">
                <CardTitle className="flex gap-2 items-end justify-between my-4">
                    <span>{data?.name}</span>
                    <div className='flex gap-2'>
                        {data?.levelCount?.length > 0 &&
                            <Popover>
                                <PopoverTrigger>
                                    <Button variant="default">Test</Button>
                                </PopoverTrigger>
                                <PopoverContent className='flex flex-col gap-2'>
                                    {
                                        data?.levelCount.map((level: any, index: number) => {
                                            return (
                                                <Button key={index}
                                                    onClick={() => {
                                                        const queryParams = new URLSearchParams(level).toString();
                                                        navigate(`${replacePathWithId(routerPaths.TEST_MULTIPLE_CHOICE, String(id))}?${queryParams}`)
                                                    }}
                                                >
                                                    {Constants.LEVEL[level?.level as 1 | 2 | 3]?.toString()}
                                                </Button>
                                            );
                                        })
                                    }
                                </PopoverContent>
                            </Popover>
                        }
                        <Button variant={"outline"}>
                            <Link to={replacePathWithId(routerPaths.TEST_MULTIPLE_CHOICE, String(id))} className="hover:cursor-pointer flex items-center gap-2">
                                Learn
                            </Link>
                        </Button>
                    </div>
                </CardTitle>
                {Array.isArray(data?.cards) && data?.cards?.length ? data?.cards.map((card: any, index: number) => {
                    return (
                        <div key={index}>
                            {currentCard === index
                                && <>
                                    <CardContent className="w-full h-full md:h-1/2 p-0 grid grid-cols-1 md:grid-cols-6 gap-1">
                                        <div className="col-span-1 md:col-span-3 flex flex-col gap-2 h-fit">

                                            <FlipCard key={index} card={card} onFlip={onFlip} />
                                        </div>
                                        <div className="col-span-1"></div>
                                        <div className="col-span-1 md:col-span-2">
                                            <SentencesExampleBox example={card?.example} />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="grid grid-cols-1 md:grid-cols-6 gap-1 mt-4">
                                        <div className="col-span-1 md:col-span-3 flex justify-end gap-6 items-center">
                                            <Button variant={"ghost"} onClick={(e) => {
                                                e.preventDefault();
                                                isFunction(showCard) && showCard(index - 1)

                                            }}><ChevronLeft /></Button>
                                            <span>{`${currentCard + 1}/${data?.cards?.length}`}</span>
                                            <Button variant={"ghost"} onClick={(e) => {
                                                e.preventDefault();
                                                isFunction(showCard) && showCard(index + 1)
                                            }}><ChevronRight /></Button>
                                        </div>
                                        <div className="col-span-3"></div>
                                    </CardFooter>
                                </>}
                        </div>
                    )

                }) : <>
                    <CardContent className="w-full h-full md:h-1/2 p-0 grid grid-cols-1 md:grid-cols-6 gap-1">
                        <div className="col-span-1 md:col-span-3 flex flex-col gap-2 h-fit">
                            <div className="flex justify-end hover:cursor-pointer">
                            </div>
                        </div>
                        <div className="col-span-1">
                            Set is empty !!!
                        </div>
                    </CardContent>

                </>}
                <div className="mx-6">
                    <div className="w-full">
                        <div className="w-full flex justify-between">
                            <span className="font-bold text-blue-700">  Learning progress</span>
                            <span className="font-bold text-blue-700"> {progress?.progressPercentage}%</span>
                        </div>
                        <Progress value={progress?.progressPercentage || 0} className="w-full h-2" />
                    </div>

                </div>
            </Card>
        </div>
    )
}

export default LearningCards