#!/bin/bash

# 현재 Mac의 로컬 IP 주소 확인
LOCAL_IP=$(ipconfig getifaddr en0)

if [ -z "$LOCAL_IP" ]; then
    # en0이 없으면 en1 시도 (다른 네트워크 인터페이스)
    LOCAL_IP=$(ipconfig getifaddr en1)
fi

echo "======================================"
echo "🎾 테니스 리그 서버 시작"
echo "======================================"
echo ""
echo "서버 주소:"
echo "  로컬: http://localhost:8000"
if [ ! -z "$LOCAL_IP" ]; then
    echo "  네트워크: http://${LOCAL_IP}:8000"
    echo ""
    echo "같은 Wi-Fi에 연결된 다른 기기에서"
    echo "http://${LOCAL_IP}:8000 로 접속하세요"
else
    echo "  ⚠️  네트워크 IP를 찾을 수 없습니다"
    echo "  Wi-Fi가 연결되어 있는지 확인하세요"
fi
echo ""
echo "서버를 종료하려면 Ctrl+C를 누르세요"
echo "======================================"
echo ""

# Python 3 웹 서버 시작
cd "$(dirname "$0")"
python3 -m http.server 8000
