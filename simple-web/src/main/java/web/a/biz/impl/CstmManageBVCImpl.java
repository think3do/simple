package web.a.biz.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Service;

import egovframework.let.utl.fcc.service.EgovStringUtil;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import web.a.biz.CstmManageBVC;
import web.a.dao.CstmManageDAO;
import web.a.dvo.CstmDVO;
import web.a.svo.CstmSVO;
import web.z.util.SearchVO;
import web.z.util.WebUtil;

@Service("CstmManageBVC")
public class CstmManageBVCImpl  extends EgovAbstractServiceImpl implements CstmManageBVC {

    @Resource(name = "CstmManageDAO")
    private CstmManageDAO cstmManageDAO;

	/**
	 * 고객정보를 등록 한다.
	 * 
	 * @exception Exception Exception
	 */
	@Override
	public void insertCstm(CstmSVO svo) throws Exception{

		CstmDVO dvo = new CstmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// id 채번
		dvo.setCstmUserNo(cstmManageDAO.getId());
		
		// default 값 셋팅
		// 제공동의 여부
		if(EgovStringUtil.isEmpty(dvo.getAgrYn())) {
			dvo.setAgrYn("Y");
		}
		// 문자발송여부
		if(EgovStringUtil.isEmpty(dvo.getSmsFrwTrgtYn())) {
			dvo.setSmsFrwTrgtYn("Y");
		}
		// 자료상태구분코드
		dvo.setMateStatClCd("01");
		
		// 저장
		cstmManageDAO.insertCstm(dvo);
	}

	/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     */
	@Override
	public Map<String, Object> listCstm(SearchVO searchVO) throws Exception {
		
		int totalCnt = cstmManageDAO.selectTotalCnt(searchVO);

		// 페이지 카운트가 2이상이면 결과값이 나오지 않아서 아래 로직을 추가함.
		if(totalCnt <= 10) {

	    	searchVO.setFirstIndex(0);
		}
		
		List<CstmDVO> result = cstmManageDAO.selectListCstm(searchVO);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(totalCnt));

		return map;
	};
	
	/**
     * 상세 조회 한다.
     *
     */
    public CstmDVO detailCstm(CstmSVO svo) throws Exception{

        CstmDVO dvo = new CstmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);
		
		return cstmManageDAO.detailCstm(dvo);
    }
    
    /**
	 * 고객정보를 수정 한다.
	 * 
	 * @exception Exception Exception
	 */
	@Override
	public void updateCstm(CstmSVO svo) throws Exception{

		CstmDVO dvo = new CstmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 자료상태구분코드
		dvo.setMateStatClCd("01");
		
		// 저장
		cstmManageDAO.updateCstm(dvo);
	}


	/**
	 * 고객정보를 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void deleteCstm(CstmSVO svo) throws Exception{

		CstmDVO dvo = new CstmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 삭제
		cstmManageDAO.deleteCstm(dvo);
	}
	
	
}
