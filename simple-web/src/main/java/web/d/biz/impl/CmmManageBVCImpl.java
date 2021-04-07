package web.d.biz.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import web.d.biz.CmmManageBVC;
import web.d.dao.CmmManageDAO;
import web.d.dvo.CmmDVO;
import web.d.svo.CmmSVO;
import web.z.util.SearchVO;
import web.z.util.WebUtil;

@Service("CmmManageBVC")
public class CmmManageBVCImpl  extends EgovAbstractServiceImpl implements CmmManageBVC {

    @Resource(name = "CmmManageDAO")
    private CmmManageDAO cmmManageDAO;

	/**
	 * 정보를 등록 한다.
	 * 
	 * @exception Exception Exception
	 */
	@Override
	public void insert(CmmSVO svo) throws Exception{

		CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 자료상태구분코드
		dvo.setMateStatClCd("01");
		
		// 저장
		cmmManageDAO.insert(dvo);
	}

	/**
     * 조건에 맞는 게시물 목록을 조회 한다.
     *
     */
	@Override
	public Map<String, Object> list(SearchVO searchVO) throws Exception {
		
		int totalCnt = cmmManageDAO.selectTotalCnt(searchVO);

		// 페이지 카운트가 2이상이면 결과값이 나오지 않아서 아래 로직을 추가함.
		if(totalCnt <= 10) {

	    	searchVO.setFirstIndex(0);
		}
		
		List<CmmDVO> result = cmmManageDAO.selectList(searchVO);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(totalCnt));

		return map;
	};
	
	/**
     * 상세 조회 한다.
     *
     */
    public CmmDVO detail(CmmSVO svo) throws Exception{

        CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);
		
		return cmmManageDAO.detail(dvo);
    }
    
    /**
	 * 정보를 수정 한다.
	 * 
	 * @exception Exception Exception
	 */
	@Override
	public void update(CmmSVO svo) throws Exception{

		CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 자료상태구분코드
		dvo.setMateStatClCd("01");
		
		// 저장
		cmmManageDAO.update(dvo);
	}


	/**
	 * 정보를 삭제 한다.
	 * 
	 * @exception Exception Exception
	 */
	public void delete(CmmSVO svo) throws Exception{

		CmmDVO dvo = new CmmDVO();
		
		// svo copy
		BeanUtils.copyProperties(dvo, svo);

		// dao etc set
		WebUtil.getEtcInfo(dvo, svo.getScreenId());
		
		// 삭제
		cmmManageDAO.delete(dvo);
	}
	
	
}
