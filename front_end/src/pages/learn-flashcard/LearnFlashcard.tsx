import FlipCard from "@/components/flash-card/FlipCard"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume1 } from 'lucide-react';
import { ChevronLeft, ChevronRight, NotebookPen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SentencesExampleBox from "@/components/flash-card/SentencesExampleBox";
import NewsetSets from "@/components/home/newest-sets/NewsetSets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetByIdAction } from "@/redux/set/slice";
import { convertDateToString, replacePathWithId, speek } from "@/lib/utils";
import { routerPaths } from "@/routes/path";
import LoadingPopup from "@/components/common/loading/loading-popup/LoadingPopup";
import { Progress } from "@/components/ui/progress"
import UserTestHistory from "@/components/user-learning/user-test-history/UserTestHistory";
import {
    getUserSetsListAction,
    addCardToMySetAction,
} from '@/redux/user-sets/slice';
import { getUserLearningSetProgressAction, updateUserProgressAction } from "@/redux/user-progress/slice";
import { getTestHistoryBySetIdAction } from "@/redux/user-tests/slice";
import { Separator } from "@/components/ui/separator";
import UserNotStudiedCards from "@/components/user-learning/user-progress/UserLearningProgress";
import LearningCards from "@/components/user-learning/learning-cards/LearningCards";
const LearnFlashcard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentCard, setCurrentCard] = useState(0);
    const { data, isLoading } = useSelector((state: any) => state.Set);
    const { mySets } = useSelector((state: any) => state.UserSets)
    const { progress } = useSelector((state: any) => state.UserProgress)
    const { history } = useSelector((state: any) => state.UserTest)
    useEffect(() => {
        if (id) {
            getSetById(id);
        }
    }, [id])

    const getSetById = (id: string) => {
        setCurrentCard(0);
        scrollTo(0, 0);
        dispatch({
            type: getSetByIdAction.type,
            payload: {
                id: id,
                // onSuccess: () => {
                // },
                // onError: (error: string) => {
                // }
            }
        })
        dispatch({
            type: getUserLearningSetProgressAction.type,
            payload: {
                data: {
                    setId: id
                }
            }
        })
        dispatch({
            type: getTestHistoryBySetIdAction.type,
            payload: {
                setId: id
            }
        })
    }
    const getUserSetsList = () => {
        dispatch({
            type: getUserSetsListAction.type,
        })
    }
    useEffect(() => {
        if (!mySets?.sets) {
            getUserSetsList()
        }
    }, [mySets])

    const showCard = (index: number) => {
        if (index >= data?.cards?.length || index < 0) {
            return;
        }
        setCurrentCard(index);
    }
    const onFlip = (card: any) => {
        dispatch({
            type: updateUserProgressAction.type,
            payload: {
                data: {
                    setId: id,
                    cardId: card?.id
                }
            }
        })
    }
    return (
        <div>
            <LoadingPopup
                open={isLoading}
            />
            <LearningCards data={data} progress={progress} onFlip={onFlip} id={id} />
            <UserNotStudiedCards data={data} progress={progress} />
            <UserTestHistory history={history} />
            <div className="mt-10">
                <NewsetSets />
            </div>
        </div >
    )
}

export default LearnFlashcard