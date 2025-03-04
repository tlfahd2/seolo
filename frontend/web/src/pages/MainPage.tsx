import CheckList from '@/../assets/icons/CheckList.svg?react';
import ListModify from '@/../assets/icons/ListModify.svg?react';
import logoutIcon from '@/../assets/images/Logout.png';
import userIcon from '@/../assets/images/usericon.png' 
import { Facilities } from '@/apis/Facilities.ts';
import { Logout } from '@/apis/Login.ts';
import {
  MainInformation,
  blueprintList,
  blueprintRegitration,
  presentUser,
} from '@/apis/Main.ts';
import { Spacer } from '@/components/basic/Spacer.tsx';
import { Button } from '@/components/button/Button.tsx';
import Card from '@/components/card/Card.tsx';
import Dropdown from '@/components/dropdown/DropDown.tsx';
import { Leaflet } from '@/components/leaflet/Leafet.tsx';
import { Menu } from '@/components/menu/Menu.tsx';
import * as Typo from '@/components/typography/Typography.tsx';
import * as Color from '@/config/color/Color.ts';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { MapContainer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { notificationEventsState } from '@/recoil/sseState.tsx';
interface NumberType {
  color: string;
  marginTop?: string;
  marginBottom?: string;
}
interface OptionType {
  id: number;
  name: string;
}

interface DropDownType {
  value: number;
  label: string;
}

interface CompanyType {
  companyCode: string;
  companyName: string;
  companyLogo: string;
  companyRegistrationNum: string;
  companyAccidentManageNum: string;
}
interface EmployeeType {
  employeeNum: string;
  company: CompanyType;
  employeeName: string;
  employeeTitle: string;
  employeeTeam: string;
  employeeBirthday: string;
  employeeThum: string;
  employeeJoinDate: string;
  employeeLeaveDate: string | null;
  companycode: string;
  birthdayMonthDay: string;
}
interface UserInformationType {
  id: number;
  employee: EmployeeType;
  status_code: string;
  locked: boolean;
  roles: string;
  pin: string;
}
const Background = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  background-color: ${Color.GRAY200};
  overflow-x: auto;
  position: relative;
`;

const MainContainer = styled.div`
  box-sizing: content-box;
  min-width: 1280px;
  height: 34rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const LeftContainer = styled.div`
  width: 23%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderContainer = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;
  margin: 4% 0 12%;
`;

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  position: relative;
  margin-top: -1%;
  background-color: black;
`;

const BannerContainer = styled.div`
  position: relative;
  margin: -6% 0% 5% 7%;
`;

const Banner = styled.span`
  font-family: NYJGothicB;
  color: ${Color.BLUE100};
  font-size: 2rem;
  background-color: ${Color.GRAY200};
`;

const SideMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 0.7rem;
  box-sizing: border-box;
`;

const LogoutBtn = styled.button`
  display: flex;
  width: 10rem;
  font-family: NYJGothicB;
  font-size: 1.3rem;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${Color.GRAY100};
  border-radius: 0.625rem;
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  padding: 0.3rem 0;
  cursor: pointer;

  &:hover {
    background-color: ${Color.RED};
  }

  &:active {
    background-color: ${Color.RED1};
  }
`;

const UserImg = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: flex-end;
`;

const UserIcon = styled.img`
  width: 100%;
`;

const LogoutIcon = styled.img`
  width: 2.3rem;
`;

const CheckListIcon = styled(CheckList)`
  width: 2.5rem;
  margin-right: 5%;
`;

const ListModifyIcon = styled(ListModify)`
  width: 2.5rem;
  margin-right: 5%;
`;

const RightContainer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Cards = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CardDrawing = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.SNOW};
  border-radius: 1.25rem;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${Color.GRAY100};
    cursor: pointer;
  }

  &:active {
    background-color: ${Color.GRAY200};
  }
`;

const InnerContainer = styled.div`
  flex-direction: column;
  flex-grow: 1;
`;

const NumberContainer = styled.div<NumberType>`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  box-sizing: border-box;
  font-size: 6rem;
  font-weight: 700;
  color: ${(props) => props.color};
  margin-top: ${(props) => props.marginTop || '0'};
  margin-bottom: ${(props) => props.marginBottom || '0'};
  /* position: relative; */
`;

// const Handle = () => {};

const MainPage = () => {
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<DropDownType | null>(
    null,
  );
  const [userData, setUserData] = useState<UserInformationType | null>(null);
  const [hoverText, setHoverText] = useState<string>('하세요');
  const events = useRecoilValue(notificationEventsState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleCardDrawingClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (fileInputRef.current) {
      fileInputRef.current.click(); // 파일 입력 요소 클릭
    }
  };
  const navigate = useNavigate();
  // 현재 유저 불러오기
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => {
      return presentUser();
    },
  });

  // 유저 정보 업데이트
  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  // 작업장 편집모드 활성화, 비활성화
  const changeModifyMode = () => {
    setModifyMode((prevMode) => !prevMode);
  };

  // 도면 등록
  const queryClient = useQueryClient();
  const { mutate: blueprintMutate } = useMutation({
    mutationFn: blueprintRegitration,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['blueprint'] });
      queryClient.invalidateQueries({ queryKey: ['markers'] });
    },
  });

  // 도면 조회
  const { data: blueprintData } = useQuery({
    queryKey: ['blueprint', selectedOption?.value],
    queryFn: () => {
      if (selectedOption) {
        return blueprintList(selectedOption.value);
      }
      return null;
    },
    enabled: selectedOption?.value !== undefined,
  });

  // 작업장 추가
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = event.target.files ? event.target.files[0] : null;
    if (file && selectedOption) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      //폼데이터와 공장 id를 put요청에 보내기
      const formData = new FormData();
      formData.append('blueprint', file);
      blueprintMutate({ data: formData, facilityId: selectedOption.value });
    }
  };

  // 로그아웃
  const handleLogout = () => {
    const fetchLogout = async () => {
      const data = await Logout();
      if (data?.status === 200) {
        navigate('/login');
      }
    };
    fetchLogout();
  };

  // 로그아웃 버튼 호버 이벤트 핸들러
  const handleMouseEnter = () => {
    setHoverText('하셨나요?');
  };

  const handleMouseLeave = () => {
    setHoverText('하세요');
  };

  // 드롭다운 옵션 가져오기
  const { data: dropdownData } = useQuery({
    queryKey: ['dropdown'],
    queryFn: () => Facilities(),
  });
  const dropdownOptions = dropdownData?.map((facility: OptionType) => ({
    value: facility.id,
    label: facility.name,
  }));
  const handleOptionChange = (option: DropDownType): void => {
    setSelectedOption(option);
  };

  // 메인페이지 통합 옵션 가져오기
  const { data: mainData } = useQuery({
    queryKey: ['main', selectedOption, events],
    queryFn: () => {
      if (selectedOption) {
        return MainInformation(selectedOption.value);
      }
      return null;
    },
    enabled: selectedOption?.value !== undefined,
  });

  // 드롭다운 옵션 초기값 설정
  useEffect(() => {
    if (dropdownOptions && !selectedOption) {
      setSelectedOption(dropdownOptions[0]);
    }
    setImageFile(blueprintData?.blueprint_url);
  }, [dropdownOptions]);
  return (
    <>
      <Background>
        <MainContainer>
          <LeftContainer>
            <div
              style={{
                fontSize: '2.2rem',
                textAlign: 'center',
                fontWeight: '8000',
                fontFamily: 'NYJGothic',
                color: Color.SAMSUNG_BLUE,
              }}
            >
              멀티캠퍼스 {userData?.employee.company.companyName}
            </div>
            <HeaderContainer>
              <Dropdown
                options={dropdownOptions}
                selectedOption={selectedOption}
                onOptionChange={handleOptionChange}
                placeholder="공장을 선택하세요"
              />

              {/* <Typo.H4 color={Color.BLACK}>1공장 조립 라인</Typo.H4> */}
            </HeaderContainer>
            <Line />
            <BannerContainer>
              <Banner>Menu</Banner>
            </BannerContainer>
            <SideMenuBox>
              <input
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <label htmlFor="fileInput">
                <Menu width={'100%'} $enterSize={1}>
                  <CheckListIcon />
                  <Typo.Body1B color={Color.ONYX}>도면 추가/수정</Typo.Body1B>
                </Menu>
              </label>
              <Spacer space={'1rem'} />
              <Menu onClick={changeModifyMode} width={'100%'} $enterSize={1}>
                <ListModifyIcon />
                <Typo.Body1B color={Color.ONYX}>마커 위치 편집</Typo.Body1B>
              </Menu>
              <Spacer space={'1rem'} />
              {modifyMode && (
                <RowContainer>
                  <Button
                    onClick={changeModifyMode}
                    width={3.5}
                    height={2}
                    $backgroundColor={Color.GRAY100}
                    $borderColor={Color.GRAY100}
                    $borderRadius={0.3}
                    $hoverBackgroundColor={Color.RED100}
                    $hoverBorderColor={Color.GRAY300}
                  >
                    <Typo.Detail0>취소</Typo.Detail0>
                  </Button>
                  <Spacer space={'1rem'} horizontal={true} />
                  <Button
                    onClick={changeModifyMode}
                    width={3.5}
                    height={2}
                    $backgroundColor={Color.GRAY100}
                    $borderColor={Color.GRAY100}
                    $borderRadius={0.3}
                    $hoverBackgroundColor={Color.GREEN400}
                    $hoverBorderColor={Color.GRAY300}
                  >
                    <Typo.Detail0>완료</Typo.Detail0>
                  </Button>
                </RowContainer>
              )}
            </SideMenuBox>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '0rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  fontFamily: 'NYJGothic',
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    color: Color.SAMSUNG_BLUE,
                    fontWeight: 'bold',
                  }}
                >
                  {userData?.employee.employeeName}
                </div>
                <div
                  style={{
                    fontSize: '2rem',
                    marginRight: '0.4rem',
                  }}
                >
                  &nbsp;님
                </div>
                <UserImg>
                  <UserIcon src={userIcon} />
                </UserImg>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'NYJGothic',
                  // backgroundColor: 'red',
                }}
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                  }}
                >
                  오늘도
                </div>
                <div
                  style={{
                    fontSize: '2rem',
                    color: Color.BLUE100,
                    fontWeight: '800',
                  }}
                >
                  &nbsp;서로&nbsp;
                </div>
                <div style={{ fontSize: '1.5rem' }}>{hoverText}</div>
              </div>
            </div>
            <LogoutBtn
              onClick={handleLogout}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <LogoutIcon src={logoutIcon} />
              로그아웃
            </LogoutBtn>
          </LeftContainer>
          <RightContainer>
            {imageFile ? (
              <CardDrawing>
                <MapContainer
                  center={[0, 0]}
                  zoom={1}
                  scrollWheelZoom={true}
                  style={{ height: '100%', width: '100%', overflow: 'hidden' }}
                  attributionControl={false}
                >
                  {imageFile && selectedOption && (
                    <Leaflet
                      imageFile={imageFile}
                      modifyMode={modifyMode}
                      selectedOption={selectedOption.value}
                    />
                  )}
                </MapContainer>
              </CardDrawing>
            ) : (
              <CardDrawing onClick={handleCardDrawingClick}>
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="fileInput"
                  ref={fileInputRef}
                />
                <div>
                  <Typo.Body0B color={Color.GRAY400}>
                    저장된 도면이 없습니다. 도면을 추가하세요.
                  </Typo.Body0B>
                  <Spacer space={'1rem'} />
                  <Typo.Body0B color={Color.GRAY400}>
                    권장 이미지 비율은 다음과 같습니다. 가로 5: 세로 3
                  </Typo.Body0B>
                </div>

                {/* </label> */}
              </CardDrawing>
            )}
            <Cards>
              <Card
                width={11}
                height={11}
                // onClick={Handle}
                flexDirection="column"
              >
                <InnerContainer>
                  <Typo.H4>
                    <div style={{ marginTop: '0.3rem' }}>등록 장비</div>
                  </Typo.H4>
                </InnerContainer>
                <NumberContainer color={Color.GREEN400} marginTop="1rem">
                  {mainData?.num_all_machines_in_this_facility}
                </NumberContainer>
              </Card>
              <Card
                width={11}
                height={11}
                // onClick={Handle}
                flexDirection="column"
              >
                <InnerContainer>
                  <Typo.H4>
                    <div style={{ marginTop: '0.3rem' }}>자물쇠 현황</div>
                  </Typo.H4>
                </InnerContainer>
                <NumberContainer color={Color.GREEN400} marginTop="1rem">
                  {mainData?.num_all_lockers_in_this_company}
                </NumberContainer>
              </Card>
              <Card
                width={11}
                height={11}
                // onClick={Handle}
                flexDirection="column"
              >
                <InnerContainer>
                  <Typo.H4>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ marginTop: '0.3rem' }}>오늘의</div>
                      <Typo.H2 color={Color.RED100}>LOTO</Typo.H2>
                    </div>
                    작업내역
                  </Typo.H4>
                  <NumberContainer color={Color.RED100} marginTop="-0.7rem">
                    {mainData?.num_toody_task_historiese_in_this_facility}
                  </NumberContainer>
                </InnerContainer>
              </Card>
              <Card
                width={11}
                height={11}
                // onClick={Handle}
                flexDirection="column"
              >
                <InnerContainer>
                  <Typo.H4>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ marginTop: '0.3rem' }}>이번 주</div>
                      <Typo.H2 color={Color.RED100}>LOTO</Typo.H2>
                    </div>
                    사용현황
                  </Typo.H4>
                </InnerContainer>
                <NumberContainer color={Color.RED100} marginTop="-0.7rem">
                  {mainData?.num_this_week_task_historiese_in_this_facility}
                </NumberContainer>
              </Card>
              <Card
                width={11}
                height={11}
                // onClick={Handle}
                flexDirection="column"
              >
                <InnerContainer>
                  <Typo.H4>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ marginTop: '0.3rem' }}>이번 달</div>
                      <Typo.H2 color={Color.RED100}>재해</Typo.H2>
                    </div>
                    발생현황
                  </Typo.H4>
                </InnerContainer>
                <NumberContainer color={Color.RED100} marginTop="-0.7rem">
                  {mainData?.num_all_accidents_in_this_company}
                </NumberContainer>
              </Card>
            </Cards>
          </RightContainer>
        </MainContainer>
      </Background>
    </>
  );
};

export default MainPage;
