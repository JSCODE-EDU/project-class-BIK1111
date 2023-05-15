// 대부분의 REST API에서 데이터 생성용 DTO 클래스와 데이터 수정용 DTO 클래스의 차이는
// 단지 속성을 필수적으로 받아야하는지 말아야하는지 밖에 없습니다.
// createdAt은 사용자가 입력하는 값이 아니기에 넣지 않는다.
// 이곳은 DB에 조작하기 위한 값만 받는 곳
import { IsNotEmpty, IsString, Length, Matches} from "class-validator";
export class CreateBoardDto {
    @IsString()
    @Matches(/^(?!\s*$).+/) // 공백으로만 이루어진 문자열 방지
    @Length(1, 15)
    title : string;
    
    @IsNotEmpty()
    @Length(1, 1000)
    description : string;
}