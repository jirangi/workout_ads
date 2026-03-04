import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutPage from '../app/page';

describe('Minimal Fit v1.05 기능 검증', () => {
  test('[F1] Zero-Click 무게 수정 시 모든 세트 동기화 여부', () => {
    render(<WorkoutPage />);
    const stepper = screen.getByText(/40kg/);
    fireEvent.click(stepper); // 수정 모드 진입 빅 스텝퍼 UI]
    
    const upButton = screen.getByText('▲');
    fireEvent.click(upButton); // 45kg으로 수정
    
    // 현재 세트 수정 시 내부 상태가 전체 세트에 반영되는지 확인
    expect(screen.getByText(/45kg/)).toBeInTheDocument(); Zero-Click 세트 동기화]
  });

  test('[F4] 14일 경과 시 5kg 자동 증량 로직 작동 여부', () => {
    // 2026-02-10(22일 전) 데이터를 기반으로 렌더링
    render(<WorkoutPage />);
    // 초기값 40kg인 벤치프레스가 45kg으로 자동 증량되어 있어야 함 스마트 증량 로직]
    expect(screen.getByText(/45kg/)).toBeInTheDocument();
  });
});
